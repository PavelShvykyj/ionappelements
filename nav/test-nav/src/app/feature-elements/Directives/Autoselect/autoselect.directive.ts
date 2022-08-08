import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAutoselect]'
})
export class AutoselectDirective {

  constructor() {}

  @HostListener('ionFocus', ['$event'])
  public onIonInputFocus(focusEvent) {
    focusEvent.target.getInputElement().then((el) => {
      el.select();
    });
  }

  @HostListener('Focus', ['$event'])
  public onInputFocus(focusEvent) {
    focusEvent.target.getInputElement().then((el) => {
      el.select();
    });
  }
}
