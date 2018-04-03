import { Router } from '@angular/router';
import { TestBed, inject } from '@angular/core/testing';

import { LoginInterceptorService } from './login-interceptor.service';

const routerStub = {} as Router;

describe('LoginInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginInterceptorService,
        { provide: Router, useValue: routerStub },
      ]
    });
  });

  it('should be created', inject([LoginInterceptorService], (service: LoginInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
