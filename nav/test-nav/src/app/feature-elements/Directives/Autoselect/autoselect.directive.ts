import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAutoselect]'
})
export class AutoselectDirective {

  constructor() {}

  @HostListener('ionFocus', ['$event'])
  public onIonInputFocus(focusEvent) {
    focusEvent.target.getInputElement().then((el) => {
      //? console.log('DIRECTIVE element',focusEvent.target);
      el.select();
    });
  }

  @HostListener('focus', ['$event'])
  public onInputFocus(focusEvent) {
    const el: HTMLInputElement = focusEvent.target;
    setTimeout(()=>{el.select();
    });
  }
}
