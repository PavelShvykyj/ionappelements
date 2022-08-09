import { Injectable, QueryList } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class IndexProcessorService {
  private indexesInternal: Array<number> = [];
  private areaactive = new BehaviorSubject<number>(-1);
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public readonly areaActiveGetter = this.areaactive;

  constructor() { }

  get indexes() {
    return this.indexes;
  }
  set indexes(indexes: Array<number>) {
    // *check for duplicates
    const unic: Set<number> = new Set(indexes);
    if (unic.size !== indexes.length) {
      throw new Error('Dublicate values in indexed area');
    }

    this.indexesInternal = indexes;
  }
  set areaActive(index) {
    if (this.indexesInternal.indexOf(index) !== -1) {
      this.areaactive.next(index);
      return;
    }
    this.areaactive.next(0);
  }

  areaActiveNext() {
    const current = this.areaactive.value;
    const next = this.indexesInternal.indexOf(current)+1;
    this.areaactive.next(this.indexesInternal[next>this.indexesInternal.length-1 ? 0 : next]);
  }

}
