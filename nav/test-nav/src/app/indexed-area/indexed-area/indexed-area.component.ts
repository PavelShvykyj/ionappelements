import {
  Component,
  Self,
  HostBinding,
  HostListener,
  ElementRef,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IndexProcessorService } from '../index-processor.service';

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
export class IndexedAreaComponent implements OnInit, OnDestroy
{

  private onEditReactor = new Subject();
  private reactorSubs: Subscription;

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
      this.indexer.areaActive = 10000;
    }
  }

  // * keyup.enter и keydown.tab - активируем следующий по значению индес в сервисе
  onEditKey(event: Event) {
    // ?console.log('onEnter', Event);
    event.preventDefault();
    event.stopPropagation();
    // * активируем следующий индекс елемент
    //this.indexer.areaActiveNext();
    this.onEditReactor.next(true);
  }

  ngOnInit(): void {
    this.reactorSubs = this.onEditReactor.pipe(debounceTime(30)).subscribe(el=> {
      // ?console.log('next index');
      this.indexer.areaActiveNext();
    });
  }

  ngOnDestroy(): void {
      this.reactorSubs.unsubscribe();
  }
}
