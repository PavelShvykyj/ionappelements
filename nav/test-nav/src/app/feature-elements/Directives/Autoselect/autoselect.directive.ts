import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAutoselect]'
})
export class AutoselectDirective {

  constructor() {}

  @HostListener('ionFocus', ['$event'])
  public onInputFocus(focusEvent) {
    focusEvent.target.getInputElement().then((el) => {
      el.select();
    });
  }

}
