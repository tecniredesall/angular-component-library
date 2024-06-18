import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';

import { GCCLListFieldOrderingComponent } from './list-field-ordering.component';

describe('GCCLListFieldOrderingComponent', () => {
  let component: GCCLListFieldOrderingComponent;
  let fixture: ComponentFixture<GCCLListFieldOrderingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GCCLListFieldOrderingComponent],
      imports: [
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatMenuModule,
        TranslateModule.forRoot({}),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GCCLListFieldOrderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
