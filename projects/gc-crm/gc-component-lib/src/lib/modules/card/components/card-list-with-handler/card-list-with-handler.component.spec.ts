import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SentryService } from '../../../../config/sentry/sentry.service';
import { GCCLListHandlerBehaviorService } from '../../../../shared/services/list-handler-behavior/list-handler-behavior.service';

import { GCCLCardListWithHandlerComponent } from './card-list-with-handler.component';

describe('CardListWithHandlerComponent', () => {
  let component: GCCLCardListWithHandlerComponent<any>;
  let fixture: ComponentFixture<GCCLCardListWithHandlerComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GCCLCardListWithHandlerComponent],
      imports: [HttpClientTestingModule],
      providers: [
        GCCLListHandlerBehaviorService,
        SentryService,
        {
          provide: 'env',
          useValue: '',
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GCCLCardListWithHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
