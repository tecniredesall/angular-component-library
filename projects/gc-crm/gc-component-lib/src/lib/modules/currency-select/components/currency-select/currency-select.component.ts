import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { SentryService } from '../../../../config/sentry/sentry.service';
import {
  ComponentConfig,
  ComponentConfigModel,
} from '../../../../core/models/config/component-config';
import { UnitConversionsHttpService } from '../../../../shared/services/unit-conversions/unit-conversions-http.service';
import { GCCLICurrency } from '../../models/currency.model';

@Component({
  selector: 'gc-cl-currency-select',
  templateUrl: './currency-select.component.html',
  styleUrls: ['./currency-select.component.scss'],
})
export class GCCLCurrencySelectComponent implements OnInit, OnDestroy {
  @ContentChild('customRefTemplate') customRefTemplate: TemplateRef<any>;
  public _config: ComponentConfig;
  public form: UntypedFormGroup = null;
  currencies: GCCLICurrency[] = [];
  private subscrition: Subscription = new Subscription();

  @Input() label: string = null;

  @Input() set config(value: ComponentConfig) {
    this._config = new ComponentConfigModel(value);
  }

  @Input() set disabled(value: boolean) {
    if (value) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Input() set currencyValueSelected(value: GCCLICurrency) {
    if (value) {
      this.form.get('currency').setValue(value);
    }
  }

  @Input() set required(value: boolean) {
    const formControl = this.form.get('currency');
    formControl.clearValidators();
    if (value) {
      formControl.setValidators([Validators.required]);
    }
    formControl.updateValueAndValidity();
  }

  @Output() eventSelectValue = new EventEmitter<{
    itemSelected: GCCLICurrency;
    formValid: boolean;
  }>();

  constructor(
    private unitConversionsHttpService: UnitConversionsHttpService,
    private formBuilder: UntypedFormBuilder,
    private sentry: SentryService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.retrieveData().finally(() => {});
  }

  ngOnDestroy(): void {
    this.subscrition.unsubscribe();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      currency: [''],
    });
    this.subscrition.add(
      this.form.get('currency').valueChanges.subscribe((slug) => {
        const itemSelected = this.currencies.find(
          (item) => item.slug?.toLowerCase() === slug.toLowerCase()
        );
        if (itemSelected) {
          this.eventSelectValue.emit({
            itemSelected,
            formValid: this.form.valid,
          });
        }
      })
    );
  }

  async retrieveData(): Promise<void> {
    try {
      this.currencies = await this.unitConversionsHttpService
        .getCurrencies(this._config)
        .toPromise();
    } catch (err) {
      this.sentry.handleError(err);
    }
  }
}
