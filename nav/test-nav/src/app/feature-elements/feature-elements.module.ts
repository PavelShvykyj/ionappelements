import { FormcellComponent } from './formcell/formcell.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormcontainerComponent } from './formcontainer/formcontainer.component';
import { AutoselectDirective } from './Directives/Autoselect/autoselect.directive';



@NgModule({
  declarations: [FormcontainerComponent,FormcellComponent, AutoselectDirective],
  imports: [
    CommonModule,
    IonicModule
  ],
  providers: [AutoselectDirective],
  exports: [FormcontainerComponent,FormcellComponent,AutoselectDirective]
})
export class FeatureElementsModule { }
