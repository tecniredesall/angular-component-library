import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GCCLBottomSheetForApprovalComponent } from './bottom-sheet-for-approval.component';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EnvironmentService } from '../../../../core/services/environment/environment.service';

describe('BottomSheetForApprovalComponent', () => {
  let component: GCCLBottomSheetForApprovalComponent;
  let fixture: ComponentFixture<GCCLBottomSheetForApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot({}), HttpClientTestingModule],
      declarations: [GCCLBottomSheetForApprovalComponent],
      providers: [
        { provide: MatBottomSheetRef, useValue: {} },
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
        EnvironmentService,
        {
          provide: 'env', // you can also use InjectionToken
          useValue: '',
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GCCLBottomSheetForApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
