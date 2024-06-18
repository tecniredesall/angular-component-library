import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GCCLConvertValueAsyncPipe } from './pipes/convert-value/convert-value.pipe';
import { GCCLSharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [GCCLConvertValueAsyncPipe],
  imports: [CommonModule, GCCLSharedModule],
  exports: [GCCLConvertValueAsyncPipe],
})
export class GCCLValueConversionModule {}
