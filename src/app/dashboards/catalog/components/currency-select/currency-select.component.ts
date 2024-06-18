import { Component, OnInit } from '@angular/core';
import { ComponentConfig } from '@gc-crm/gc-component-lib';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-currency-select',
  templateUrl: './currency-select.component.html',
  styleUrls: ['./currency-select.component.scss'],
})
export class CurrencySelectComponent implements OnInit {
  public baseConfig: ComponentConfig = null;
  currencyToSelect: any;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private translateService: TranslateService) {
    this.subscribeLanguageChanges();
  }

  ngOnInit(): void {
    this.setConfig();
    this.currencyToSelect = 'USD';
  }

  private subscribeLanguageChanges(): void {
    this.translateService.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ lang }) => {
        if (this.baseConfig) {
          this.baseConfig = { ...this.baseConfig, ...{ lang } };
        }
      });
  }

  currencySelected(val: any): void {}

  private setConfig(): void {
    this.baseConfig = {
      lang: 'en',
      app: '',
      partitionKey: 'public',
    };
  }
}
