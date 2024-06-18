import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicPipeHandlerPipe } from '../../pipes/dynamic-pipe-handler/dynamic-pipe-handler.pipe';

import { GCCLTableColumnHandlerComponent } from './table-column-handler.component';

xdescribe('GCCLTableColumnHandlerComponent', () => {
  let component: GCCLTableColumnHandlerComponent;
  let fixture: ComponentFixture<GCCLTableColumnHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GCCLTableColumnHandlerComponent, DynamicPipeHandlerPipe],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GCCLTableColumnHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
