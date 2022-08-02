import { Component } from '@angular/core';
import { IonNav, ModalController } from '@ionic/angular';
import { Level1Component } from './level1/level1.component';
import { LevelsnavComponent } from './levelsnav/levelsnav.component';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  constructor(private modalController: ModalController) {}

  open() {
    this.modalController.create({component:LevelsnavComponent, componentProps:{
      rootPage:Level1Component
    }}).then(el=> el.present());
  }
}
