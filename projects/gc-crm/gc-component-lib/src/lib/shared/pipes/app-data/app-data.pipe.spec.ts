import { TestBed } from '@angular/core/testing';
import { GCCLAppDataService } from '../../services/app-data/app-data.service';
import { GCCLAppDataPipe } from './app-data.pipe';

describe('AppDataPipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GCCLAppDataService],
    });
  });

  it('create an instance', () => {
    const service: GCCLAppDataService = TestBed.get(GCCLAppDataService);
    const pipe = new GCCLAppDataPipe(service);
    expect(pipe).toBeTruthy();
  });
});
