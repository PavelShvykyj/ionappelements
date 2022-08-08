import { Injectable, QueryList } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class IndexProcessorService {
  public indexes: Array<number> = [];
  private areaactive = new BehaviorSubject<number>(-1);
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public readonly areaActiveGetter = this.areaactive;

  constructor() { }

  set areaActive(index) {
    if (this.indexes.indexOf(index) !== -1) {
      this.areaactive.next(index);
      return;
    }
    this.areaactive.next(0);
  }

  areaActiveNext() {
    const current = this.areaactive.value;
    const next = this.indexes.indexOf(current)+1;
    this.areaactive.next(this.indexes[next>this.indexes.length-1 ? 0 : next]);
  }

}
