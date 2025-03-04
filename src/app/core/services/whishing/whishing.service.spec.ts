import { TestBed } from '@angular/core/testing';

import { WhishingService } from './whishing.service';

describe('WhishingService', () => {
  let service: WhishingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhishingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
