import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GCCLTableComponent } from './table.component';

describe('GCCLTableComponent', () => {
  let component: GCCLTableComponent;
  let fixture: ComponentFixture<GCCLTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GCCLTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GCCLTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
