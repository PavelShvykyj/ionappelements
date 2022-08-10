import {
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  Input,
  SkipSelf,
  QueryList,
  ChangeDetectionStrategy,
} from '@angular/core';
import { IndexProcessorService } from '../index-processor.service';

@Component({
  selector: 'app-indexed-element',
  templateUrl: './indexed-element.component.html',
  styleUrls: ['./indexed-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '(click)': 'onClick($event)',
  },
})
export class IndexedElementComponent {
  // * собственный индекс
  @Input()
  areaIndex: number;

  // * список подчиенных маркированны (наших) инпутов
  @ContentChildren('myinput',{descendants:true})
  inputEl: QueryList<ElementRef>;

  // * получаем сервис определенный в родителе не ищем его в себе
  constructor(@SkipSelf() private indexer: IndexProcessorService) {}

  // * атрибут нужен так как иначе елемент не фокусируемый и не получает событий от key.tab
  @HostBinding('tabindex')
  get selfIndex() {return this.areaIndex;};

  @HostBinding('class.onedit')
  get onEdit() {
    return this.areaIndex === this.indexer.areaActiveGetter.value;
  }
  // * устанавлиаем активный индес и фокусирум первый подчиненный маркированный инпут
  onClick(event) {
    if (this.onEdit) {
      return;
    }
    // ?console.log('onClick', event);
    this.indexer.areaActive = this.areaIndex;
    this.focusInput();
  }

  focusInput() {
    if (this.onEdit) {
      if (this.inputEl.length !== 0) {
        // ?console.error('inputEl.length', this.inputEl.length);
        this.inputEl.get(0).nativeElement.focus();
      }
    }
  }

}
