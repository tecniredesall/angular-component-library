import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { EnvironmentService } from '../../../../core/services/environment/environment.service';
import { UnitConversionsHttpService } from '../../../../shared/services/unit-conversions/unit-conversions-http.service';
import { GCCLConvertValueAsyncPipe } from './convert-value.pipe';

describe('ConvertValuePipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        EnvironmentService,
        UnitConversionsHttpService,
        {
          provide: 'env', // you can also use InjectionToken
          useValue: '',
        },
      ],
    });
  });

  it('create an instance', inject(
    [UnitConversionsHttpService],
    (unitConversionsHttpService: UnitConversionsHttpService) => {
      const pipe = new GCCLConvertValueAsyncPipe(unitConversionsHttpService);
      expect(pipe).toBeTruthy();
    }
  ));
});
