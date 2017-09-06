/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppAuthService } from './app-auth.service';

describe('Service: AppAuth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppAuthService]
    });
  });

  it('should ...', inject([AppAuthService], (service: AppAuthService) => {
    expect(service).toBeTruthy();
  }));
});
