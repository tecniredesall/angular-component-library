import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GCCLInfiniteScrollWrapperComponent } from './components/infinite-scroll-wrapper/infinite-scroll-wrapper.component';
import { GCCLSharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [GCCLInfiniteScrollWrapperComponent],
  imports: [CommonModule, TranslateModule, GCCLSharedModule],
  exports: [GCCLInfiniteScrollWrapperComponent],
})
export class GCCLInfiniteScrollModule {}
