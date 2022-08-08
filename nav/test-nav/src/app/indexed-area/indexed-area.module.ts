import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexedAreaComponent } from './indexed-area/indexed-area.component';
import { IndexedElementComponent } from './indexed-element/indexed-element.component';



@NgModule({
  declarations: [IndexedAreaComponent,IndexedElementComponent],
  imports: [
    CommonModule
  ],
  exports:[IndexedAreaComponent,IndexedElementComponent]
})
export class IndexedAreaModule { }
