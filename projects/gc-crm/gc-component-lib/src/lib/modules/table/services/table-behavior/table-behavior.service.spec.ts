import { TestBed } from '@angular/core/testing';

import { GCCLTableBehaviorService } from './table-behavior.service';

describe('GCCLTableBehaviorService', () => {
  let service: GCCLTableBehaviorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GCCLTableBehaviorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
