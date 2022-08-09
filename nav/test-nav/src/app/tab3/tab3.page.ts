import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  show = false;
  contextData = {
    first: 1,
    second: 2,
    third:3
  };

  list: Array<number> = [];

  constructor() {
      for (let index = 4; index < 50; index++){
          this.list.push(index);
        }

  }

  onfocus(childe: HTMLInputElement) {
    setTimeout(()=>childe.focus(), 1000) ;
  }

  onClick() {
    console.log('INPUT on click');
  }
}
