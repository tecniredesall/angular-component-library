import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { GCCLSearchInputComponent } from './search-input.component';

describe('SearchInputComponent', () => {
  let component: GCCLSearchInputComponent;
  let fixture: ComponentFixture<GCCLSearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GCCLSearchInputComponent],
      imports: [TranslateModule.forRoot({})],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GCCLSearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
