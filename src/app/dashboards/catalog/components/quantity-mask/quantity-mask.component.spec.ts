import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityMaskComponent } from './quantity-mask.component';

xdescribe('QuantityMaskComponent', () => {
  let component: QuantityMaskComponent;
  let fixture: ComponentFixture<QuantityMaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuantityMaskComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantityMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
