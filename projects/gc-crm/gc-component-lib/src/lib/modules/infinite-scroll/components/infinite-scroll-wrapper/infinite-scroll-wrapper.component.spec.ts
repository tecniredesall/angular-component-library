import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GCCLInfiniteScrollWrapperComponent } from './infinite-scroll-wrapper.component';

describe('InfiniteScrollWrapperComponent', () => {
  let component: GCCLInfiniteScrollWrapperComponent;
  let fixture: ComponentFixture<GCCLInfiniteScrollWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GCCLInfiniteScrollWrapperComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GCCLInfiniteScrollWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
