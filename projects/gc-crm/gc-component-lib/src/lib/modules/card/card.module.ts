import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GCCLCardListWithHandlerComponent } from './components/card-list-with-handler/card-list-with-handler.component';
import { GCCLSharedModule } from '../../shared/shared.module';
import { GCCLEmptyModule } from '../empty/empty.module';
import { TranslateModule } from '@ngx-translate/core';
import { GCCLSearchInputModule } from '../search-input/search-input.module';
import { GCCLListFieldOrderingModule } from '../list-field-ordering/list-item-ordering.module';
import { GCCLCardComponent } from './components/card/card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GCCLInfiniteScrollModule } from '../infinite-scroll/infinite-scroll.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [GCCLCardListWithHandlerComponent, GCCLCardComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    GCCLSharedModule,
    GCCLEmptyModule,
    GCCLSearchInputModule,
    GCCLListFieldOrderingModule,
    GCCLInfiniteScrollModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
  ],
  exports: [GCCLCardListWithHandlerComponent, GCCLCardComponent],
})
export class GCCLCardModule {}
