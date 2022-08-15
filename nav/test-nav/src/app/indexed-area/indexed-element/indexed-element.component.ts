import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
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
export class IndexedElementComponent
  implements OnInit, OnDestroy, AfterContentInit
{
  // * собственный индекс
  @Input()
  areaIndex: number;

  // * список подчиенных маркированны (наших) инпутов
  @ContentChildren(FocusableDirective, { descendants: true })
  directiveEl: QueryList<FocusableDirective>;

  private lastOnEdit = false;
  private idexersubs: Subscription;

  // * получаем сервис определенный в родителе не ищем его в себе
  constructor(@SkipSelf() private indexer: IndexProcessorService) {}

  @HostBinding('class.onedit')
  get onEdit() {
    // ?console.log('bind onEdit');
    return this.lastOnEdit;
  }

  ngOnInit(): void {
    // this.indexer.addIndex(this.areaIndex,this);
    // this.idexersubs = this.indexer.areaActiveGetter.subscribe((ind) => {
    //   const nowOnEdit =  (this.areaIndex === ind);
    //   const statusChanged = nowOnEdit !== this.lastOnEdit;
    //   if (statusChanged) {
    //     // if (nowOnEdit) {
    //       // ? console.log('now change',ind,nowOnEdit);
    //       setTimeout((() => this.focusInput(nowOnEdit)).bind(this));
    //     // }
    //     this.lastOnEdit = nowOnEdit;
    //   }
    // });
  }

  ngOnDestroy(): void {
    this.indexer.removeIndex(this.areaIndex);
    this.idexersubs.unsubscribe();
  }

  ngAfterContentInit(): void {
    this.directiveEl.forEach((el) => (el.appFocusable = this.areaIndex));
  }
  // * устанавлиаем активный индес и фокусирум первый подчиненный маркированный инпут
  onClick(event) {
    if (this.lastOnEdit) {
      return;
    }
    // ?console.log('onClick', event);
    this.indexer.areaActive = this.areaIndex;
  }

  focusInput(onFocus: boolean) {
    // ?console.log('focusInput');
    //if (this.onEdit) {
      // ?console.error('inputEl.length', this.directiveEl.length);
      if (this.directiveEl.length !== 0) {
        // TODO что то что сможет сфокусировать не только инпут а и мат.инпут, ионик инпут - универсально
        this.directiveEl.get(0).focusOn = onFocus;
      }
    //}
  }
}
