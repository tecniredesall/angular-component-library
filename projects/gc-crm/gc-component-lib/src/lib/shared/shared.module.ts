import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WrapperClassDirective } from './directives/wrapper-class.directive';
import { GcTranslatePipe } from './pipes/gc-translate/gc-translate.pipe';
import { UnitConversionsHttpService } from './services/unit-conversions/unit-conversions-http.service';
import { IsValuePropertyInArrayPipe } from './pipes/is-value-property-in-array/is-value-property-in-array.pipe';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { GCCLAppDataPipe } from './pipes/app-data/app-data.pipe';

@NgModule({
  declarations: [
    WrapperClassDirective,
    GcTranslatePipe,
    IsValuePropertyInArrayPipe,
    ClickOutsideDirective,
    GCCLAppDataPipe,
  ],
  imports: [CommonModule],
  exports: [
    WrapperClassDirective,
    GcTranslatePipe,
    IsValuePropertyInArrayPipe,
    GCCLAppDataPipe,
  ],
  providers: [UnitConversionsHttpService],
})
export class GCCLSharedModule {}
