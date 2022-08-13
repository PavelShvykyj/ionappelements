import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tab3Page {
  show = false;
  contextData = {
    first: 1,
    second: 2,
    third:3
  };

  dataTable: Array<{[key: string]: any}> = [];


  password: string;
  list: Array<number> = [];

  constructor() {
      for (let indexrow = 0; indexrow <= 9; indexrow++){
        const row: {[key: string]: any}  = {names: []};
        for (let colindex = 0; colindex <= 9; colindex++) {
              const name = 'c'+colindex;
              row.names.push(name);
              row[name] = this.getIndex(indexrow,colindex);
          }
        this.dataTable.push(row);
        }
  }

  onfocus(childe: HTMLInputElement) {
    setTimeout(()=>childe.focus(), 1000) ;
  }

  onClick() {
    console.log('INPUT on click');
  }

  getIndex(i,j) {
    return (i*10)+(j+1);
  }
}
