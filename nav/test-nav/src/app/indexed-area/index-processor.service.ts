import { ElementRef, Injectable, OnDestroy,  } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filter} from 'rxjs/operators';
import { FocusableDirective } from './focusable.directive';

export interface IFocusableDirective {
  focusOn: boolean;
}
@Injectable()
export class IndexProcessorService implements OnDestroy {

  private indexesInternal: Array<number> = [];
  private indexedElements: {[key: number]: IFocusableDirective} = {10000: {focusOn: false}};
  private idexersubs: Subscription;
  private areaactive = new BehaviorSubject<number>(10000);
  private lastOnEdit = 10000;


  constructor() {
    this.idexersubs = this.areaactive
                          .pipe(
                            filter(ind=> ind !== this.lastOnEdit))
                          .subscribe(ind => {
                            this.indexedElements[this.lastOnEdit].focusOn = false;
                            this.indexedElements[ind].focusOn = true;
                            this.lastOnEdit = ind;
                          });
  }



  set areaActive(index) {
    if (this.indexesInternal.indexOf(index) !== -1) {
      this.areaactive.next(index);
      return;
    }
    this.areaactive.next(10000);
  }

  ngOnDestroy(): void {
    this.idexersubs.unsubscribe();
  }

  addIndex(ind: number, ref: FocusableDirective) {
    if (this.indexesInternal.indexOf(ind) !== -1) {
      throw new Error('Dublicate values in indexed area');
    }

    const needtosort = (ind < this.indexesInternal[this.indexesInternal.length-1]);

    this.indexesInternal.push(ind);
    if (needtosort) {
      this.indexesInternal.sort((a,b)=> a-b);
    }
    this.indexedElements[ind] = ref;
  }

  removeIndex(ind: number) {
    const inPosition = this.indexesInternal.indexOf(ind);
    this.indexesInternal = this.indexesInternal.splice(inPosition,1);
  }

  areaActiveNext() {
    const current = this.areaactive.value;
    const next = this.indexesInternal.indexOf(current)+1;
    // ?console.log('ind val, next ind, next val',current, next, this.indexesInternal[next]);
    this.areaactive.next(this.indexesInternal[next>this.indexesInternal.length-1 ? 0 : next]);
  }
}
