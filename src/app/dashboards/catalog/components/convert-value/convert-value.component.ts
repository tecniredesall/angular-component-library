import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ComponentConfig, GCCLIDataToConvert } from '@gc-crm/gc-component-lib';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-convert-value',
  templateUrl: './convert-value.component.html',
  styleUrls: ['./convert-value.component.scss'],
})
export class ConvertValueComponent implements OnInit {
  public form: UntypedFormGroup;
  public errorMatcher = new ErrorStateMatcher();
  public baseConfig: ComponentConfig = {
    lang: 'en',
    app: 'trumodity',
    partitionKey: 'public',
    auth: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5EUkJSRVUxTXpCRVF6STRNRGd6T1RCRU1EZ3hOVGRFTlROR1JUazNORU0xTnpJeE16STROZyJ9.eyJodHRwOi8vd3d3LmdyYWluY2hhaW4uaW8vcm9sZXMiOlsiYnItYnV5ZXIiXSwiaXNzIjoiaHR0cHM6Ly9ncmFpbmNoYWluZGV2LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2MzFmYTZlYjg2M2JhZjJhYzAwZWMyYjkiLCJhdWQiOiJodHRwczovL2dyYWluY2hhaW5kZXYuYXV0aDAuY29tL2FwaS92Mi8iLCJpYXQiOjE2NjY5MDYwNjQsImV4cCI6MTY2OTQ5ODA2NCwiYXpwIjoic1lxeHZBZzJNMkJiS3J6RGQ5RkdrdjVOdmFBTnhSWXAiLCJzY29wZSI6InJlYWQ6Y3VycmVudF91c2VyIHVwZGF0ZTpjdXJyZW50X3VzZXJfbWV0YWRhdGEgZGVsZXRlOmN1cnJlbnRfdXNlcl9tZXRhZGF0YSBjcmVhdGU6Y3VycmVudF91c2VyX21ldGFkYXRhIGNyZWF0ZTpjdXJyZW50X3VzZXJfZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpjdXJyZW50X3VzZXJfZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpjdXJyZW50X3VzZXJfaWRlbnRpdGllcyIsImd0eSI6InBhc3N3b3JkIn0.ROGd8YDMaRwCGnysCGWPngocHU51QJMw2EvuroE__VZ558VZK9oB87Yriy5avtIJ5-8qw5Q0oyifno8UKnmwOvMuhZvKifRhxgiFCEZZ0EdRAShzg1HQs0Q6RyxLZyy6-DmYnDk_8nH9w9YHWGxtk_v03fiAn8UG1_qKRpEOWoAx16PV44uiX3ST6xEWAcau8lj5u1oc_3sGvWUcXmO1FrtC6n0iAX7k0ifGpChJylmt6_yc1tR5zXxOFbW-nxS_-mDoH5qWlt0zFvtZh87AjB9NGl7sQkHYmkZ0l4mpzFWAmCo8c2aRwiOYkCboIqnXifRi9eVduejv5ga_DcGSWA',
  };

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private translateService: TranslateService
  ) {
    this.subscribeLanguageChanges();
  }

  ngOnInit(): void {
    this.createForm();
  }

  get conversionData(): { value: number; settings: GCCLIDataToConvert } {
    if (!this.form.valid) {
      return null;
    }
    const {
      convert,
      unit_type,
      from,
      to,
      adjustment_type,
      fraction_digits,
      short_fraction_digits,
    } = this.form.getRawValue();

    return {
      value: convert,
      settings: {
        unit_type,
        from,
        to,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        ...(!isNaN(adjustment_type) &&
          '' !== adjustment_type?.toString()?.trim() && { adjustment_type }),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        ...(!isNaN(fraction_digits) &&
          '' !== fraction_digits?.toString()?.trim() && { fraction_digits }),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        ...(!isNaN(short_fraction_digits) &&
          '' !== short_fraction_digits?.toString()?.trim() && {
            short_fraction_digits,
          }),
      },
    };
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      unit_type: ['weight', [Validators.required]],
      convert: ['2', [Validators.required]],
      from: ['lb', [Validators.required]],
      to: ['kg', [Validators.required]],
      adjustment_type: [''],
      fraction_digits: [''],
      short_fraction_digits: [''],
    });
  }

  private subscribeLanguageChanges(): void {
    this.translateService.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ lang }) => {
        this.baseConfig = { ...this.baseConfig, ...{ lang } };
      });
  }
}
