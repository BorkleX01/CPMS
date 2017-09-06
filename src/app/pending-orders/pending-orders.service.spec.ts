/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PendingOrdersService } from './pending-orders.service';

describe('Service: PendingOrders', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PendingOrdersService]
    });
  });

  it('should ...', inject([PendingOrdersService], (service: PendingOrdersService) => {
    expect(service).toBeTruthy();
  }));
});
