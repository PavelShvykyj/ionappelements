import {
  Component,
  OnInit,
  QueryList,
  Self,
  ContentChildren,
  AfterContentInit,
  HostBinding,
  OnDestroy,
  HostListener,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { IndexProcessorService } from '../index-processor.service';
import { IndexedElementComponent } from '../indexed-element/indexed-element.component';

@Component({
  selector: 'app-indexed-area',
  templateUrl: './indexed-area.component.html',
  styleUrls: ['./indexed-area.component.scss'],
  providers: [IndexProcessorService],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
  '(keyup.enter)': 'onEditKey($event)',
  '(keydown.tab)': 'onEditKey($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexedAreaComponent
  implements OnInit, AfterContentInit, OnDestroy
{
  @ContentChildren(IndexedElementComponent, {descendants: true})
  indexedElements: QueryList<IndexedElementComponent>;

  private qlSubs: Subscription;
  private activeIndexSubs: Subscription;

  constructor(
    // * сервис определен в самом компоненте отмечаем что инжектор ведет поиск только
    // * внутри компонента т.е. у каждого екземпляра свой сервис
    @Self() private indexer: IndexProcessorService,
    // * ссылка на себя для определения клика вне себя
    private selfRef: ElementRef
  ) {}

  // * атрибут нужен так как иначе елемент не фокусируемый и не получает событий от key.tab
  @HostBinding('tabindex')
  get selfIndex() {
    return 0;
  }

  // * слушаем глобальный клик если не в области вызывает сброс текущего индекса
  @HostListener('window:click', ['$event'])
  onGlobalClick(event) {
    const onAreaClick = event.path.indexOf(this.selfRef.nativeElement) !== -1;
    // ?console.log('onAreaClick ', onAreaClick);
    if (!onAreaClick) {
      this.indexer.areaActive = -1;
    }
  }

  ngOnInit() {
    this.activeIndexSubs = this.indexer.areaActiveGetter.subscribe((ind) => {
      if (ind === -1) {
        return;
      }
      // ?console.log('NEXT ind', ind);
      if (this.indexedElements) {
        this.sendClick(ind);
      }
    });
  }

  ngOnDestroy(): void {
    this.qlSubs.unsubscribe();
    this.activeIndexSubs.unsubscribe();
  }

  ngAfterContentInit(): void {
    this.indexer.indexes = this.indexedElements
      .map((el: IndexedElementComponent) => el.areaIndex)
      .sort((a,b)=>a-b);
    // * состав компонентов может быть изменен - переопределим состав индексов в сервисе
    this.qlSubs = this.indexedElements.changes.subscribe((ql) => {
      // ?console.log('QL', ql);
      this.indexer.indexes = ql.map((el: IndexedElementComponent) => el.areaIndex).sort((a,b)=>a-b);
    });
  }

  // * вызов из подписки на активный индес по индексу ищем подчиненый елемент и вызываем функцию клик на нем
  sendClick(ind) {
    // ?console.log('sendClick', ind);
    const next = this.indexedElements.filter((el) => el.areaIndex === ind);
    // ?console.log('indexedElements lenth', next.length);
    if (next.length !== 0) {
      next[0].focusInput();
    }
  }

  // * keyup.enter и keydown.tab - активируем следующий по значению индес в сервисе
  onEditKey(event: Event) {
    // ?console.log('onEnter', Event);
    event.preventDefault();
    event.stopPropagation();
    // * фокусируем себя если следующий индекс елеметент не имеет инпута
    this.selfRef.nativeElement.focus();
    // * активируем следующий индекс елемент
    this.indexer.areaActiveNext();
  }

}
