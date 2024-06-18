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
import { GCCLIWeightUnit } from '../../models/weight-unit/weight-unit.model';

@Component({
  selector: 'gc-cl-weight-unit-select',
  templateUrl: './weight-unit-select.component.html',
  styleUrls: ['./weight-unit-select.component.scss'],
})
export class GCCLWeightUnitSelectComponent implements OnInit, OnDestroy {
  @ContentChild('customRefTemplate') customRefTemplate: TemplateRef<any>;
  public _config: ComponentConfig;
  public form: UntypedFormGroup = null;
  weightUnits: GCCLIWeightUnit[] = [];
  private subscrition: Subscription = new Subscription();

  @Input() set config(value: ComponentConfig) {
    this._config = new ComponentConfigModel(value);
  }

  @Input() set weightUnitValueSelected(value: GCCLIWeightUnit) {
    if (value) {
      this.form.get('weightUnit').setValue(value);
    }
  }

  @Input() set disabled(value: boolean) {
    if (value) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Input() set required(value: boolean) {
    const formControl = this.form.get('weightUnit');
    formControl.clearValidators();
    if (value) {
      formControl.setValidators([Validators.required]);
    }
    formControl.updateValueAndValidity();
  }

  @Output() eventSelectValue = new EventEmitter<{
    itemSelected: GCCLIWeightUnit;
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

  initForm(): void {
    this.form = this.formBuilder.group({
      weightUnit: [''],
    });
    this.subscrition.add(
      this.form.get('weightUnit').valueChanges.subscribe((slug) => {
        const itemSelected = this.weightUnits.find(
          (item) => item.slug.toLowerCase() === slug.toLowerCase()
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

  ngOnDestroy(): void {
    this.subscrition.unsubscribe();
  }

  async retrieveData(): Promise<void> {
    try {
      this.weightUnits = await this.unitConversionsHttpService
        .getWeightUnits(this._config)
        .toPromise();
    } catch (error) {
      this.sentry.handleError(error);
    }
  }
}
