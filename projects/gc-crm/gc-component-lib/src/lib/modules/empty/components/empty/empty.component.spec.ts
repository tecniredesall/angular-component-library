import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { GCCLEmptyComponent } from './empty.component';

xdescribe('GCCLEmptyComponent', () => {
  let component: GCCLEmptyComponent;
  let fixture: ComponentFixture<GCCLEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GCCLEmptyComponent],
      imports: [TranslateModule.forRoot({})],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GCCLEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
