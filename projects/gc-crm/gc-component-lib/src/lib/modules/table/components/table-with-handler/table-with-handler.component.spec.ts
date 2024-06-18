import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GCCLTableWithHandlerComponent } from './table-with-handler.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TableWithHandlerComponent', () => {
  let component: GCCLTableWithHandlerComponent;
  let fixture: ComponentFixture<GCCLTableWithHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GCCLTableWithHandlerComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GCCLTableWithHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
