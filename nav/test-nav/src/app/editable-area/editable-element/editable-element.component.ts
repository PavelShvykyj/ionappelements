import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-editable-element',
  templateUrl: './editable-element.component.html',
  styleUrls: ['./editable-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '(customFocus)': 'setOnEdit($event)',
    },
})
export class EditableElementComponent  {
  // * редактируемые данные ссылка
  @Input()
  contextData: object;

  // * имя редактируемых данных в объекте
  @Input()
  contextName: string;

  // * определяет что рендерить когда родитель не "индексированный елемент"
  @Input()
  onEdit = false;

  constructor() {}

  // * срабатывает когда рендериться edit- template и соответвесвенно фокусирует маркированный инпут
  @ViewChild('myinput')
  set focusInput(el: ElementRef) {
    if (el) {
      el.nativeElement.focus();
      el.nativeElement.type = this.getInputType(
        this.contextData,
        this.contextName
      );
    }
  }

  public setOnEdit(v: boolean) {
    // ? console.log('editable on edit set',v);
    this.onEdit = v;
  }

  getInputType(edit, editCellName: string): string {
    const inputtype = (typeof edit[editCellName]).toString();
    //? console.log('input type', inputtype,edit[editCellName] , edit);
    return inputtype;
  }
}
