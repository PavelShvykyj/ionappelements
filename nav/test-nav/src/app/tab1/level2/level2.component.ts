import { Component, Input, OnInit } from '@angular/core';
import { IonNav } from '@ionic/angular';
import { Level3Component } from '../level3/level3.component';

@Component({
  selector: 'app-level2',
  templateUrl: './level2.component.html',
  styleUrls: ['./level2.component.scss'],
})
export class Level2Component implements OnInit {
  @Input()
  nav: IonNav;
  constructor() { }

  ngOnInit() {}

  goBack() {
    this.nav.pop();
  }

  goForvard() {
    this.nav.push(Level3Component,{
      nav: this.nav
    });
  }

}
