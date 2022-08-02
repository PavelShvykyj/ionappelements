import { Level2Component } from './../level2/level2.component';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NavController, IonNav, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-level1',
  templateUrl: './level1.component.html',
  styleUrls: ['./level1.component.scss'],
})
export class Level1Component implements OnInit {

  @Input()
  rootPage: any;

  @Input()
  nav: IonNav;

  constructor(private ctrl: ModalController) { }

  ngOnInit() {}

  goBack() {
    this.ctrl.dismiss();
  }

  goForvard() {
    this.nav.push(Level2Component,{
      nav: this.nav
    });
  }
}
