import { Directive, ElementRef, EventEmitter, HostBinding, Inject, Input, Output, OnInit, OnDestroy, SkipSelf } from '@angular/core';
import { focusfunctions } from './focusable-functions/focusable-functions';
import { IndexProcessorService } from './index-processor.service';

@Directive({
  selector: '[appFocusable]',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '(click)': 'onClick($event)',
  },
})
export class FocusableDirective implements OnInit, OnDestroy {
  @HostBinding('tabindex')
  @Input()
  appFocusable: number;

  @HostBinding('class.onedit')
  @Input()
  onEdit = false;

  @Output() customFocus: EventEmitter<any> = new EventEmitter();

  focusfunk: (el: any, evetn?: EventEmitter<any>, value?: any) => void;

  constructor(@Inject(ElementRef) private element: ElementRef,
              @SkipSelf() private indexer: IndexProcessorService) {
    this.focusFunkName = 'native';
  }



  @Input()
  set focusFunkName(name) {
    this.focusfunk = focusfunctions[name].bind(this);
  };



  public set focus(onfocus: boolean) {
    // ? console.log('DIRECTIVE focus on',this.element.nativeElement);
    this.focusfunk(this.element,this.customFocus,onfocus);
    this.onEdit = onfocus;
  }

  onClick(event) {
    // ?console.log('onClick', event);
    this.indexer.areaActive = this.appFocusable;
  }

  ngOnDestroy(): void {
    this.indexer.removeIndex(this.appFocusable);
  }
  ngOnInit(): void {
    this.indexer.addIndex(this.appFocusable, this);
  }

}
