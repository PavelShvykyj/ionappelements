import { Injectable, QueryList } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class IndexProcessorService {
  private indexesInternal: Array<number> = [];
  private areaactive = new BehaviorSubject<number>(-1);
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public readonly areaActiveGetter = this.areaactive;

  constructor() { }

  set areaActive(index) {
    if (this.indexesInternal.indexOf(index) !== -1) {
      this.areaactive.next(index);
      return;
    }
    this.areaactive.next(-1);
  }

  addIndex(ind: number) {
    if (this.indexesInternal.indexOf(ind) !== -1) {
      throw new Error('Dublicate values in indexed area');
    }
    this.indexesInternal.push(ind);
  }

  removeIndex(ind: number) {
    const inPosition = this.indexesInternal.indexOf(ind);
    this.indexesInternal.splice(inPosition,1);
  }

  areaActiveNext() {
    const current = this.areaactive.value;
    const next = this.indexesInternal.indexOf(current)+1;
    this.areaactive.next(this.indexesInternal[next>this.indexesInternal.length-1 ? 0 : next]);
  }
}
