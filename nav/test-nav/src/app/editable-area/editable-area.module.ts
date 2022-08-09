import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditableElementComponent } from './editable-element/editable-element.component';
import { FormsModule } from '@angular/forms';
import { FeatureElementsModule } from '../feature-elements/feature-elements.module';



@NgModule({
  declarations: [EditableElementComponent],
  imports: [
    CommonModule,
    FormsModule,
    FeatureElementsModule
  ],
  exports: [EditableElementComponent]
})
export class EditableAreaModule { }
