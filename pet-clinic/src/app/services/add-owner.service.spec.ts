import { TestBed } from '@angular/core/testing';

import { AddOwnerService } from './add-owner.service';

describe('AddOwnerService', () => {
  let service: AddOwnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddOwnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
