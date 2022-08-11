import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexedAreaComponent } from './indexed-area/indexed-area.component';
import { IndexedElementComponent } from './indexed-element/indexed-element.component';
import { FocusableDirective } from './focusable.directive';



@NgModule({
  declarations: [IndexedAreaComponent,IndexedElementComponent, FocusableDirective],
  imports: [
    CommonModule
  ],
  exports:[IndexedAreaComponent,IndexedElementComponent,FocusableDirective]
})
export class IndexedAreaModule { }
