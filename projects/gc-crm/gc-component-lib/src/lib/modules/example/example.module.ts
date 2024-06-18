import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GCCLExampleTextComponent } from './components/example-text/example-text.component';
import { GCCLSharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [GCCLExampleTextComponent],
  imports: [CommonModule, GCCLSharedModule],
  exports: [GCCLExampleTextComponent],
})
export class GCCLExampleModule {}
