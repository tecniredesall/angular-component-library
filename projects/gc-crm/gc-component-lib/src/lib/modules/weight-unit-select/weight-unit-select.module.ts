import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GCCLWeightUnitSelectComponent } from './components/weight-unit-select/weight-unit-select.component';
import { MatSelectModule } from '@angular/material/select';
import { GCCLSharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [GCCLWeightUnitSelectComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    TranslateModule,
    GCCLSharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [GCCLWeightUnitSelectComponent],
})
export class GCCLWeightUnitSelectModule {}
