import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GCCLEmptyComponent } from './components/empty/empty.component';
import { GCCLSharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [GCCLEmptyComponent],
  imports: [CommonModule, TranslateModule, GCCLSharedModule],
  exports: [GCCLEmptyComponent],
})
export class GCCLEmptyModule {}
