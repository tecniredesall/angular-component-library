import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GCCLSearchSelectComponent } from './components/search-select/search-select.component';
import { TranslateModule } from '@ngx-translate/core';
import { GCCLSharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [GCCLSearchSelectComponent],
  exports: [GCCLSearchSelectComponent],
  imports: [
    CommonModule,
    TranslateModule,
    GCCLSharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
})
export class GCCLSearchSelectModule {}
