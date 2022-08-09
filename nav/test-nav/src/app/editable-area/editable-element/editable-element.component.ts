import { Component, ContentChildren, ElementRef, Injector, Input, OnInit, QueryList, ViewChild, ViewContainerRef } from '@angular/core';
import { IndexedElementComponent } from 'src/app/indexed-area/indexed-element/indexed-element.component';

@Component({
  selector: 'app-editable-element',
  templateUrl: './editable-element.component.html',
  styleUrls: ['./editable-element.component.scss'],
})
export class EditableElementComponent implements OnInit {

  @Input()
  contextData: object;

  @Input()
  contextName: string;

  @Input()
  onEdit = false;

  parentComponent: IndexedElementComponent;

  constructor(private injector: Injector) { }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  get OnEdit() {
    if(this.parentComponent) {
      return this.parentComponent.onEdit;
    }
    return this.onEdit;
  }

  @ViewChild('myinput')
  set focusInput(el: ElementRef) {
    if (el) {
      el.nativeElement.focus();
    }
  }

  ngOnInit() {
    const indexerel = this.injector.get<IndexedElementComponent>(IndexedElementComponent);
    if (indexerel) {
      this.parentComponent = indexerel;
    }
  }

}
