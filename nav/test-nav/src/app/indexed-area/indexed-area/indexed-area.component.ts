import {  Component, OnInit, QueryList, Self, ViewChildren, ElementRef, ContentChildren, AfterContentInit, HostBinding, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IndexProcessorService } from '../index-processor.service';
import { IndexedElementComponent } from '../indexed-element/indexed-element.component';

@Component({
  selector: 'app-indexed-area',
  templateUrl: './indexed-area.component.html',
  styleUrls: ['./indexed-area.component.scss'],
  providers:[ IndexProcessorService]
})
export class IndexedAreaComponent implements OnInit, AfterContentInit, OnDestroy {

  @ContentChildren(IndexedElementComponent)
  indexedElements: QueryList<IndexedElementComponent>;

  private qlSubs: Subscription;
  constructor(@Self() private indexer: IndexProcessorService) { }

  @HostBinding('tabindex')
  get selfIndex() {return 0;};

  ngOnInit() {
    this.indexer.areaActiveGetter.subscribe(ind => {
      console.log('NEXT ind',ind);
      if(ind === -1)
      {
        return;
      }

      if (this.indexedElements) {
        this.sendClick(ind);
      };
    });
  }

  ngOnDestroy(): void {
    this.qlSubs.unsubscribe();
  }

  ngAfterContentInit(): void {
    this.indexer.indexes = this.indexedElements.map(el => el.areaIndex).sort();
    this.qlSubs = this.indexedElements.changes.subscribe(ql =>{
      console.log('QL',ql);
      this.indexer.indexes = ql.map(el => el.areaIndex).sort();
    });
  }

  sendClick(ind) {
    console.log('sendClick',ind);
    const next = this.indexedElements.filter(el => el.areaIndex===ind );

    console.log('indexedElements lenth', next.length);

    if (next.length!==0) {
      const nextel = next[0];
      //console.log('next element',nextel);
      //const nextelonedit = nextel.onEdit;
      //console.log('nextelonedit',nextelonedit);
        nextel.rizeClick();
    }
  }

}
