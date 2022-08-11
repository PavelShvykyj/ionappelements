import { Directive, ElementRef, HostBinding, Inject, Input } from '@angular/core';
import { focusfunctions } from './focusable-functions/focusable-functions';

@Directive({
  selector: '[appFocusable]'
})
export class FocusableDirective {
  @HostBinding('tabindex')
  @Input()
  appFocusable = 0;

  private focusfunk: (el: any) => void;

  constructor(@Inject(ElementRef) private element: ElementRef) {
    this.focusfunkname = 'native';
  }

  @Input()
  set focusfunkname(name) {
    this.focusfunk = focusfunctions[name];
  };

  public set focus(onfocus: boolean) {
    //? console.log(this.element.nativeElement);
    this.focusfunk(this.element);
  }
}
