import { Level1Component } from '../level1/level1.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonNav } from '@ionic/angular';

@Component({
  selector: 'app-levelsnav',
  templateUrl: './levelsnav.component.html',
  styleUrls: ['./levelsnav.component.scss'],
})
export class LevelsnavComponent implements OnInit {

  @ViewChild('LevelsNav', {static:false})
  nav: IonNav;
  rootPage = Level1Component;
  rootParams;
  constructor() { }

  ngOnInit() {
  }
}
