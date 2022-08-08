import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appCustomfocus]'
})
export class CustomfocusDirective {

  private focusPrivate = false;
  constructor() { }
  get appCustomfocus(): boolean {
    return this.focusPrivate;
  }
  @Input()
  set appCustomfocus(v: boolean) {
    this.focusPrivate = v;
  }
}
