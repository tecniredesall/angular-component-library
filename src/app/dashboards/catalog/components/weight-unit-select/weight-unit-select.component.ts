import { Component, OnInit } from '@angular/core';
import { ComponentConfig } from '@gc-crm/gc-component-lib';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-weight-unit-select',
  templateUrl: './weight-unit-select.component.html',
  styleUrls: ['./weight-unit-select.component.scss'],
})
export class WeightUnitSelectComponent implements OnInit {
  public baseConfig: ComponentConfig = null;
  weightUnitToSelect: any;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private translateService: TranslateService) {
    this.subscribeLanguageChanges();
  }

  ngOnInit(): void {
    this.setConfig();
    this.weightUnitToSelect = 'qq';
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

  weightUnitSelected(val: any): void {}

  private setConfig(): void {
    this.baseConfig = {
      lang: 'en',
      app: '',
      partitionKey: 'public',
    };
  }
}
