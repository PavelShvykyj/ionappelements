import {
  Component,
  ContentChildren,
  HostBinding,
  Input,
  SkipSelf,
  QueryList,
  ChangeDetectionStrategy,
  OnDestroy,
  OnInit,
  AfterContentInit,
} from '@angular/core';
import { FocusableDirective } from '../focusable.directive';
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
export class IndexedElementComponent implements OnInit, OnDestroy, AfterContentInit {
  // * собственный индекс
  @Input()
  areaIndex: number;

  // * список подчиенных маркированны (наших) инпутов
  @ContentChildren(FocusableDirective,{descendants:true})
  directiveEl: QueryList<FocusableDirective>;

  private lastOnEdit = false;

  // * получаем сервис определенный в родителе не ищем его в себе
  constructor(@SkipSelf() private indexer: IndexProcessorService) {}

  // * атрибут нужен так как иначе елемент не фокусируемый и не получает событий от key.tab
  @HostBinding('tabindex')
  get selfIndex() {return this.areaIndex;};

  @HostBinding('class.onedit')
  get onEdit() {
    const nowOnEdit =  (this.areaIndex === this.indexer.areaActiveGetter.value);
    const statusChanged = nowOnEdit !== this.lastOnEdit;
    if (statusChanged) {
      if (nowOnEdit) {
        setTimeout((() => this.focusInput()).bind(this));
      }
      this.lastOnEdit = nowOnEdit;
    }
    return nowOnEdit;
  }

  ngOnInit(): void {
    this.indexer.addIndex(this.areaIndex);
  };

  ngOnDestroy(): void {
    this.indexer.removeIndex(this.areaIndex);
  }

  ngAfterContentInit(): void {
    this.directiveEl.forEach(el => el.appFocusable = this.areaIndex);
  }
  // * устанавлиаем активный индес и фокусирум первый подчиненный маркированный инпут
  onClick(event) {
    if (this.onEdit) {
      return;
    }
    // ?console.log('onClick', event);
    this.indexer.areaActive = this.areaIndex;
  }

  focusInput() {
    // ?console.log('focusInput');
    if (this.onEdit) {
      // ?console.error('inputEl.length', this.directiveEl.length);
      if (this.directiveEl.length !== 0) {
        // TODO что то что сможет сфокусировать не только инпут а и мат.инпут, ионик инпут - универсально
        this.directiveEl.get(0).focus = true;
      }
    }
  }

}
