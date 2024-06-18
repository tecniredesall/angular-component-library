import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GCCLCurrencySelectComponent } from './components/currency-select/currency-select.component';
import { MatSelectModule } from '@angular/material/select';
import { GCCLSharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [GCCLCurrencySelectComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    TranslateModule,
    GCCLSharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [GCCLCurrencySelectComponent],
})
export class GCCLCurrencySelectModule {}
