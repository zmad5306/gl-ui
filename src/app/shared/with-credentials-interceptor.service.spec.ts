import { TestBed, inject } from '@angular/core/testing';

import { WithCredentialsInterceptorService } from './with-credentials-interceptor.service';

describe('WithCredentialsInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WithCredentialsInterceptorService]
    });
  });

  it('should be created', inject([WithCredentialsInterceptorService], (service: WithCredentialsInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
