import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GCCLCardComponent } from './card.component';

describe('CardComponent', () => {
  let component: GCCLCardComponent<any>;
  let fixture: ComponentFixture<GCCLCardComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GCCLCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GCCLCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
