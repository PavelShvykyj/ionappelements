import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor() {}

  onfocus(childe: HTMLInputElement) {
    setTimeout(()=>childe.focus(), 1000) ;
  }

  onClick() {
    console.log('INPUT on click');
  }
}
