import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ErrorHandler, ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from './core/services/environment/environment.service';
import { GCCLExampleModule } from './modules/example/example.module';
import { GCCLTableModule } from './modules/table/table.module';
import { SentryService } from './config/sentry/sentry.service';
import { GCCLWeightUnitSelectModule } from './modules/weight-unit-select/weight-unit-select.module';
import { GCCLCurrencySelectModule } from './modules/currency-select/currency-select.module';
import { GCCLValueConversionModule } from './modules/value-conversion/value-conversion.module';
import { GCCLSearchSelectModule } from './modules/search-select/search-select.module';
import { GCCLCardModule } from './modules/card/card.module';

import { GCCLListFieldOrderingModule } from './modules/list-field-ordering/list-item-ordering.module';
import { GCCLInfiniteScrollModule } from './modules/infinite-scroll/infinite-scroll.module';
import { GCCLProgressBarModule } from './modules/progress-bar/progress-bar.module';
import { GCCLBottomSheetForApprovalModule } from './modules/bottom-sheet-for-approval/bottom-sheet-for-approval.module';
import { GCCLSearchInputModule } from './modules/search-input/search-input.module';

@NgModule({
  declarations: [],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
    }),
    GCCLExampleModule,
    GCCLTableModule,
    GCCLWeightUnitSelectModule,
    GCCLCurrencySelectModule,
    GCCLValueConversionModule,
    GCCLSearchSelectModule,
    GCCLSearchInputModule,
    GCCLListFieldOrderingModule,
    GCCLInfiniteScrollModule,
    GCCLCardModule,
    GCCLProgressBarModule,
    GCCLBottomSheetForApprovalModule,
  ],
  exports: [
    GCCLExampleModule,
    GCCLTableModule,
    GCCLWeightUnitSelectModule,
    GCCLCurrencySelectModule,
    GCCLValueConversionModule,
    GCCLSearchSelectModule,
    GCCLSearchInputModule,
    GCCLListFieldOrderingModule,
    GCCLInfiniteScrollModule,
    GCCLCardModule,
    GCCLProgressBarModule,
    GCCLBottomSheetForApprovalModule,
  ],
  providers: [
    { provide: ErrorHandler, useClass: SentryService },
    EnvironmentService,
  ],
})
export class GcComponentLibModule {
  public static forRoot({
    environment,
  }: {
    environment: any;
  }): ModuleWithProviders<GcComponentLibModule> {
    return {
      ngModule: GcComponentLibModule,
      providers: [
        EnvironmentService,
        {
          provide: 'env', // you can also use InjectionToken
          useValue: environment,
        },
      ],
    };
  }
}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n-gc-cl/', '.json');
}
