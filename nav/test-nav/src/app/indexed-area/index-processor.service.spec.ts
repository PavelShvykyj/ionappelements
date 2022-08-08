import { TestBed } from '@angular/core/testing';

import { IndexProcessorService } from './index-processor.service';

describe('IndexProcessorService', () => {
  let service: IndexProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexProcessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
