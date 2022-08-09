import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import {
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  Self,
  SkipSelf,
  ViewChild,
  QueryList,
} from '@angular/core';
import { IndexProcessorService } from '../index-processor.service';
import { EditableElementComponent } from 'src/app/editable-area/editable-element/editable-element.component';

@Component({
  selector: 'app-indexed-element',
  templateUrl: './indexed-element.component.html',
  styleUrls: ['./indexed-element.component.scss'],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '(click)': 'onClick($event)',
    '(keyup.enter)': 'onEditKey($event)',
    '(keydown.tab)': 'onEditKey($event)',
  },
})
export class IndexedElementComponent implements OnInit {
  @Input()
  areaIndex: number;

  @ContentChildren('myinput',{descendants:false})
  inputEl: QueryList<ElementRef>;

  // qlsubs: Subscription;

  constructor(
    @SkipSelf() private indexer: IndexProcessorService,
    private selfRef: ElementRef
  ) {
    console.log('ctror IndexedElementComponent self ref', selfRef);
  }

  @HostBinding('tabindex')
  get selfIndex() {return this.areaIndex;};

  @HostBinding('class.onedit')
  get onEdit() {
    return this.areaIndex === this.indexer.areaActiveGetter.value;
  }

  ngOnInit() {}

  onClick(event) {
    console.log('onClick', event);
    this.indexer.areaActive = this.areaIndex;
    if (this.inputEl.length === 0) {
      console.error('inputEl.length', this.inputEl.length);
      // ?may be just return
      // *have no inputs go to next indexed element
      //this.goNext();
      // if (this.qlsubs) {
      //   this.qlsubs.unsubscribe();
      // }
      // this.qlsubs = this.inputEl.changes.subscribe(ql=>{
      //   console.log('QL inputs lenh ', ql.length);
      //   ql.get(0).nativeElement.focus();
      // });
      return;
    }
      console.log('inputs lenth ',this.inputEl.length);
      this.inputEl.get(0).nativeElement.focus();

  }

  onEditKey(event: Event) {
    console.log('onEnter', Event);
    event.preventDefault();
    event.stopPropagation();
    this.goNext();
  }

  rizeClick() {
    console.log('rizeClick on', this.selfRef.nativeElement);
    //  this.selfElement.nativeElement.click();
    this.selfRef.nativeElement.click();
  }

  goNext() {
    console.log('GoNext');
    this.indexer.areaActiveNext();
  }
}
