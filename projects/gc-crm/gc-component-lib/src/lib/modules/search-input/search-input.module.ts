import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GCCLSearchInputComponent } from './components/search-input/search-input.component';
import { GCCLSearchConfigDirective } from './directives/search-config/search-config.directive';
import { TranslateModule } from '@ngx-translate/core';
import { GCCLSharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [GCCLSearchInputComponent, GCCLSearchConfigDirective],
  imports: [CommonModule, TranslateModule, GCCLSharedModule],
  exports: [GCCLSearchInputComponent],
})
export class GCCLSearchInputModule {}
