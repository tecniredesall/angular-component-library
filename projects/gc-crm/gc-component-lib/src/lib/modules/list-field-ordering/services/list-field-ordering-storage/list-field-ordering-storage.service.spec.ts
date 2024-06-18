import { TestBed } from '@angular/core/testing';

import { GCCLFieldItemOrderingStorageService } from './list-field-ordering-storage.service';

describe('GCCLFieldItemOrderingStorageService', () => {
  let service: GCCLFieldItemOrderingStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GCCLFieldItemOrderingStorageService],
    });
    service = TestBed.inject(GCCLFieldItemOrderingStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
