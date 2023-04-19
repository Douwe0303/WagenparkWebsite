import { TestBed } from '@angular/core/testing';

import { LeasecarService } from './leasecar.service';

describe('LeasecarService', () => {
  let service: LeasecarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeasecarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
