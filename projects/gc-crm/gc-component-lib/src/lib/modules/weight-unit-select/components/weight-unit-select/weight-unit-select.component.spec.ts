import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { EnvironmentService } from '../../../../core/services/environment/environment.service';
import { UnitConversionsHttpService } from '../../../../shared/services/unit-conversions/unit-conversions-http.service';

import { GCCLWeightUnitSelectComponent } from './weight-unit-select.component';

describe('GCCLWeightUnitSelectComponent', () => {
  let component: GCCLWeightUnitSelectComponent;
  let fixture: ComponentFixture<GCCLWeightUnitSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GCCLWeightUnitSelectComponent],
      providers: [
        HttpClientTestingModule,
        UntypedFormBuilder,
        UnitConversionsHttpService,
        EnvironmentService,
        {
          provide: 'env', // you can also use InjectionToken
          useValue: '',
        },
      ],
      imports: [
        TranslateModule.forRoot({}),
        MatSelectModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GCCLWeightUnitSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
