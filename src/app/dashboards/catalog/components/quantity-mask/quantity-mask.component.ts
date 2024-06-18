import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { TranslateService } from '@ngx-translate/core';
import {
  GCCLQuantityMask,
  GCCLQuantityNumberToString,
  GCCLQuantityStringToNumber,
} from '@gc-crm/gc-component-lib';
import { GCCLIQuantityOptionsMask } from '@gc-crm/gc-component-lib';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-quantity-mask',
  templateUrl: './quantity-mask.component.html',
  styleUrls: ['./quantity-mask.component.scss'],
})
export class QuantityMaskComponent implements OnInit, OnDestroy {
  form: UntypedFormGroup;
  currencyMask: any;
  customMask: GCCLIQuantityOptionsMask = {
    languageCode: 'en-US',
    currency: false,
    prefix: 'HNL',
    suffix: '',
    decimalLimit: 3,
    formatCurrency: 'narrow',
  };
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private translateService: TranslateService,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.subscribeLanguageChanges();
    this.initForm();
    this.currencyMask = GCCLQuantityMask(this.customMask);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  initForm(): void {
    this.form = this.fb.group({
      quantity: [''],
      currency: [false],
      unformatted: [''],
      formatted: [''],
    });
  }

  onChange(e: MatCheckboxChange): void {
    this.customMask.currency = e.checked;
    this.currencyMask = GCCLQuantityMask({
      ...this.customMask,
    });
  }

  private subscribeLanguageChanges(): void {
    this.translateService.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ lang }) => {
        this.customMask.languageCode = lang;
        this.currencyMask = GCCLQuantityMask(this.customMask);
      });
  }

  onSave(): void {
    this.form?.controls?.unformatted?.setValue(
      GCCLQuantityStringToNumber(
        this.form?.controls?.quantity?.value as string,
        this.customMask.languageCode
      )
    );

    this.form?.controls?.formatted?.setValue(
      GCCLQuantityNumberToString(
        this.form?.controls?.unformatted?.value as number,
        this.customMask.languageCode
      )
    );
  }
}
