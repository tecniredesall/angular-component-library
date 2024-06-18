import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GCCLTableComponent } from './components/table/table.component';
import { GCCLTableActionsComponent } from './components/table-actions/table-actions.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { GCCLTableColumnHandlerComponent } from './components/table-column-handler/table-column-handler.component';
import { FirstAndMiddleNamePipe } from './pipes/data-pipes/first-and-middle-name/first-and-middle-name.pipe';
import { OneEmailPipe } from './pipes/data-pipes/one-email/one-email.pipe';
import { OnePhonePipe } from './pipes/data-pipes/one-phone/one-phone.pipe';
import {
  DynamicAsyncPipeHandlerPipe,
  DynamicPipeHandlerPipe,
} from './pipes/dynamic-pipe-handler/dynamic-pipe-handler.pipe';
import { GcDateFormatPipe } from './pipes/gc-date-format/gc-date-format.pipe';
import { TableActiveColumnsKeyPipe } from './pipes/table-active-columns-key/table-active-columns-key.pipe';
import { TableActionDirective } from './directives/table-action/table-action.directive';
import { TableColumnMinMaxWidthDirective } from './directives/table-colum-min-max-width/table-colum-min-max-width.directive';
import { GCCLTableWithHandlerComponent } from './components/table-with-handler/table-with-handler.component';
import { GCCLSharedModule } from '../../shared/shared.module';
import { GCCLEmptyModule } from '../empty/empty.module';
import { GCCLSearchInputModule } from '../search-input/search-input.module';
import { GCCLListFieldOrderingModule } from '../list-field-ordering/list-item-ordering.module';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    GCCLTableComponent,
    GCCLTableWithHandlerComponent,
    GCCLTableActionsComponent,
    GCCLTableColumnHandlerComponent,
    FirstAndMiddleNamePipe,
    OneEmailPipe,
    OnePhonePipe,
    DynamicPipeHandlerPipe,
    DynamicAsyncPipeHandlerPipe,
    GcDateFormatPipe,
    TableActiveColumnsKeyPipe,
    TableActionDirective,
    TableColumnMinMaxWidthDirective,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MatTooltipModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatMenuModule,
    GCCLSharedModule,
    GCCLEmptyModule,
    GCCLSearchInputModule,
    GCCLListFieldOrderingModule,
  ],
  exports: [GCCLTableComponent, GCCLTableWithHandlerComponent],
})
export class GCCLTableModule {}
