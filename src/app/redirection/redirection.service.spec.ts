/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RedirectionDetailService } from './redirection-detail.service';

describe('Service: RedirectionDetail', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RedirectionDetailService]
    });
  });

  it('should ...', inject([RedirectionDetailService], (service: RedirectionDetailService) => {
    expect(service).toBeTruthy();
  }));
});
