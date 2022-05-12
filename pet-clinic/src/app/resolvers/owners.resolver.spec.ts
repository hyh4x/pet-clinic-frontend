import { TestBed } from '@angular/core/testing';

import { OwnersResolver } from './owners.resolver';

describe('OwnersResolver', () => {
  let resolver: OwnersResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(OwnersResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
