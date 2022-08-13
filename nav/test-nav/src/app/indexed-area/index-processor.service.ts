import { Injectable, OnDestroy,  } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filter} from 'rxjs/operators';
import { FocusableDirective } from './focusable.directive';
@Injectable()
export class IndexProcessorService implements OnDestroy {

  private indexesInternal: Array<number> = [];
  private indexedElements: {[key: number]: FocusableDirective} = {};
  private idexersubs: Subscription;
  private areaactive = new BehaviorSubject<number>(-1);
  private lastOnEdit = -1;
  // // eslint-disable-next-line @typescript-eslint/member-ordering
  // public readonly areaActiveGetter = this.areaactive;

  constructor() {
    this.idexersubs = this.areaactive
                          .pipe(
                            filter(ind=> ind !== this.lastOnEdit))
                          .subscribe(ind => {
                            this.indexedElements[this.lastOnEdit].focus = false;
                            this.indexedElements[ind].focus = true;
                            this.lastOnEdit = ind;
                          });
   }



  set areaActive(index) {
    if (this.indexesInternal.indexOf(index) !== -1) {
      this.areaactive.next(index);
      return;
    }
    this.areaactive.next(-1);
  }

  ngOnDestroy(): void {
    this.idexersubs.unsubscribe();
  }

  addIndex(ind: number, ref: FocusableDirective) {
    if (this.indexesInternal.indexOf(ind) !== -1) {
      throw new Error('Dublicate values in indexed area');
    }
    this.indexesInternal.push(ind);
    this.indexedElements[ind] = ref;
  }

  removeIndex(ind: number) {
    const inPosition = this.indexesInternal.indexOf(ind);
    this.indexesInternal.splice(inPosition,1);
  }

  areaActiveNext() {
    const current = this.areaactive.value;
    const next = this.indexesInternal.indexOf(current)+1;
    // ? console.log('next',this.indexesInternal[next]);
    this.areaactive.next(this.indexesInternal[next>this.indexesInternal.length-1 ? 0 : next]);
  }
}
