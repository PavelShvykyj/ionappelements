import { Component, Input, OnInit } from '@angular/core';
import { IonNav } from '@ionic/angular';

@Component({
  selector: 'app-level3',
  templateUrl: './level3.component.html',
  styleUrls: ['./level3.component.scss'],
})
export class Level3Component implements OnInit {
  @Input()
  nav: IonNav;
  constructor() { }

  ngOnInit() {}

  goBack() {
    this.nav.pop();
  }
}
