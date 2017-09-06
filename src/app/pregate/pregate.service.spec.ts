/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PregateService } from './pregate.service';

describe('Service: Pregate', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PregateService]
    });
  });

  it('should ...', inject([PregateService], (service: PregateService) => {
    expect(service).toBeTruthy();
  }));
});
