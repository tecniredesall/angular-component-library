import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { MainComponent } from './components/main/main.component';
import { ExampleComponent } from './components/example/example.component';
import {
  GCCLExampleModule,
  GCCLTableModule,
  GCCLEmptyModule,
  GCCLWeightUnitSelectModule,
  GCCLCurrencySelectModule,
  GCCLValueConversionModule,
  GCCLSearchSelectModule,
  GCCLCardModule,
  GCCLProgressBarModule,
  GCCLBottomSheetForApprovalModule,
} from '@gc-crm/gc-component-lib';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableBehaviorService } from './services/table-behavior.service';
import { GenericTableComponent } from './components/generic-table/generic-table.component';
import { GenericTableWithHandlerComponent } from './components/generic-table-with-handler/generic-table-with-handler.component';
import { EmptyComponent } from './components/empty/empty.component';
import { WeightUnitSelectComponent } from './components/weight-unit-select/weight-unit-select.component';
import { CurrencySelectComponent } from './components/currency-select/currency-select.component';

import { ConvertValueComponent } from './components/convert-value/convert-value.component';
import { QuantityMaskComponent } from './components/quantity-mask/quantity-mask.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { GenericSelectComponent } from './components/generic-select/generic-select.component';
import { GenericCardListWithHandlerComponent } from './components/generic-card-list-with-handler/generic-card-list-with-handler.component';
import { CardComponent } from './components/card/card.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { BottomSheetForApprovalComponent } from './components/bottom-sheet-for-approval/bottom-sheet-for-approval.component';
@NgModule({
  declarations: [
    MainComponent,
    ExampleComponent,
    GenericTableComponent,
    GenericTableWithHandlerComponent,
    EmptyComponent,
    WeightUnitSelectComponent,
    CurrencySelectComponent,
    ConvertValueComponent,
    QuantityMaskComponent,
    GenericSelectComponent,
    GenericCardListWithHandlerComponent,
    CardComponent,
    ProgressBarComponent,
    BottomSheetForApprovalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogRoutingModule,
    GCCLExampleModule,
    GCCLTableModule,
    GCCLEmptyModule,
    GCCLWeightUnitSelectModule,
    GCCLCurrencySelectModule,
    GCCLValueConversionModule,
    GCCLCardModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    GCCLSearchSelectModule,
    GCCLProgressBarModule,
    GCCLBottomSheetForApprovalModule,
  ],
  providers: [TableBehaviorService],
})
export class CatalogModule {}
