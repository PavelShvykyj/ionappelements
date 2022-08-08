import { Component, ContentChild, ContentChildren, ElementRef, HostBinding, Input, OnInit, Self, SkipSelf, ViewChild, QueryList } from '@angular/core';
import { IndexProcessorService } from '../index-processor.service';

@Component({
  selector: 'app-indexed-element',
  templateUrl: './indexed-element.component.html',
  styleUrls: ['./indexed-element.component.scss']
})
export class IndexedElementComponent implements OnInit {

  @Input()
  areaIndex: number;

  @ViewChild('container', {read: ElementRef})
  selfElement: ElementRef;

  @ContentChildren('myinput')
  inputEl: QueryList<ElementRef>;

  constructor(@SkipSelf() private indexer: IndexProcessorService) { }

  get onEdit() {
    return this.areaIndex === this.indexer.areaActiveGetter.value;
  }

  // @HostBinding('click')
  onClick(event) {
    console.log('onClick',event);


      this.indexer.areaActive = this.areaIndex;
      this.inputEl.get(0).nativeElement.focus();
  }
  //@HostBinding('keyup')
  onEnter(event: Event) {
    console.log('onEnter',Event);
    event.preventDefault();
    event.stopPropagation();
    this.goNext();
  }

  // @HostBinding('keyup')
  // onTab(event: Event) {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   this.goNext();
  // }

  rizeClick() {
    console.log('rizeClick on',this.selfElement.nativeElement);
    this.selfElement.nativeElement.click();
  }



  ngOnInit() {}

  goNext() {
    console.log('GoNext');
    this.indexer.areaActiveNext();
  }
}
