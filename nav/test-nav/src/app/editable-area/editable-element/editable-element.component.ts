import {
  Component,
  ElementRef,
  Injector,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IndexedElementComponent } from 'src/app/indexed-area/indexed-element/indexed-element.component';

@Component({
  selector: 'app-editable-element',
  templateUrl: './editable-element.component.html',
  styleUrls: ['./editable-element.component.scss'],
})
export class EditableElementComponent implements OnInit {
  // * редактируемые данные ссылка
  @Input()
  contextData: object;

  // * имя редактируемых данных в объекте
  @Input()
  contextName: string;

  // * определяет что рендерить когда родитель не "индексированный елемент"
  @Input()
  onEdit = false;

  // * предпологаемый родитель "индексированный елемент - он знает мы сейчас редактируемые или нет в приоритете над нашим свойством"
  parentComponent: IndexedElementComponent;

  constructor(private injector: Injector) {}

  // * определяем что рендерить wiev- or edit- template
  // eslint-disable-next-line @typescript-eslint/naming-convention
  get OnEdit() {
    if (this.parentComponent) {
      return this.parentComponent.onEdit;
    }
    return this.onEdit;
  }

  // * срабатывает когда рендериться edit- template и соответвесвенно фокусирует маркированный инпут
  @ViewChild('myinput')
  set focusInput(el: ElementRef) {
    if (el) {
      el.nativeElement.focus();
    }
  }

  // * получаем из инжектора родительский индексируемый елемент
  ngOnInit() {
    const indexerel = this.injector.get<IndexedElementComponent>(
      IndexedElementComponent
    );
    if (indexerel) {
      this.parentComponent = indexerel;
    }
  }

  getInputType(edit, editCellName: string): string {
    const inputtype = (typeof edit[editCellName]).toString();
    //? console.log('input type', inputtype,edit[editCellName] , edit);
    return inputtype;
  }
}
