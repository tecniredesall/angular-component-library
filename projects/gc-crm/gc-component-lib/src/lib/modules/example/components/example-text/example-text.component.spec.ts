import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GCCLExampleTextComponent } from './example-text.component';

describe('GCCLExampleTextComponent', () => {
  let component: GCCLExampleTextComponent;
  let fixture: ComponentFixture<GCCLExampleTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GCCLExampleTextComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GCCLExampleTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
