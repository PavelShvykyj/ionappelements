import { Directive, ElementRef, EventEmitter, HostBinding, Inject, Input, Output } from '@angular/core';
import { focusfunctions } from './focusable-functions/focusable-functions';

@Directive({
  selector: '[appFocusable]'
})
export class FocusableDirective {
  @HostBinding('tabindex')
  @Input()
  appFocusable = 0;

  @Output() customFocus: EventEmitter<any> = new EventEmitter();

  focusfunk: (el: any, evetn?: EventEmitter<any>, value?: any) => void;

  constructor(@Inject(ElementRef) private element: ElementRef) {
    this.focusfunkname = 'native';
  }

  @Input()
  set focusfunkname(name) {
    this.focusfunk = focusfunctions[name].bind(this);
  };

  public set focus(onfocus: boolean) {
    // ? console.log('DIRECTIVE focus on',this.element.nativeElement);
    this.focusfunk(this.element,this.customFocus,onfocus);
  }
}
