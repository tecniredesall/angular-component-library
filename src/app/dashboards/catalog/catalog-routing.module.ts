import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ExampleComponent } from './components/example/example.component';
import { GenericTableWithHandlerComponent } from './components/generic-table-with-handler/generic-table-with-handler.component';
import { EmptyComponent } from './components/empty/empty.component';
import { GenericTableComponent } from './components/generic-table/generic-table.component';
import { WeightUnitSelectComponent } from './components/weight-unit-select/weight-unit-select.component';
import { CurrencySelectComponent } from './components/currency-select/currency-select.component';
import { ConvertValueComponent } from './components/convert-value/convert-value.component';
import { QuantityMaskComponent } from './components/quantity-mask/quantity-mask.component';
import { GenericSelectComponent } from './components/generic-select/generic-select.component';
import { CardComponent } from './components/card/card.component';
import { GenericCardListWithHandlerComponent } from './components/generic-card-list-with-handler/generic-card-list-with-handler.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { BottomSheetForApprovalComponent } from './components/bottom-sheet-for-approval/bottom-sheet-for-approval.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'example',
        component: ExampleComponent,
      },
      {
        path: 'generic-table',
        component: GenericTableComponent,
      },
      {
        path: 'generic-table-with-handler',
        component: GenericTableWithHandlerComponent,
      },
      {
        path: 'empty',
        component: EmptyComponent,
      },
      {
        path: 'weight-unit-select',
        component: WeightUnitSelectComponent,
      },
      {
        path: 'currency-select',
        component: CurrencySelectComponent,
      },
      {
        path: 'convert-value-pipe',
        component: ConvertValueComponent,
      },
      {
        path: 'quantity-mask',
        component: QuantityMaskComponent,
      },
      {
        path: 'generic-select',
        component: GenericSelectComponent,
      },
      {
        path: 'list-card',
        component: GenericCardListWithHandlerComponent,
      },
      {
        path: 'card',
        component: CardComponent,
      },
      {
        path: 'progress-bar',
        component: ProgressBarComponent,
      },
      {
        path: 'bottom-sheet-for-approval',
        component: BottomSheetForApprovalComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogRoutingModule {}
