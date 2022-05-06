import { TestBed } from '@angular/core/testing';

import { XsrfInterceptorService } from './xsrf-interceptor.service';

describe('XsrfInterceptorService', () => {
  let service: XsrfInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XsrfInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
