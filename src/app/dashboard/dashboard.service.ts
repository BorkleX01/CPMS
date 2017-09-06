import { Injectable, Input } from '@angular/core';
import { Headers, RequestOptions, Http, Response, HttpModule } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

import { ApiSettings } from '../shared/api-settings';
import { RequestHeader } from '../shared/request-header';
import { TokenRequest } from '../shared/token-request';

@Injectable()
export class DashboardService {

  	requestHeader;
   
    constructor(private http: Http) {
        this.getHeaders();
    }

    getHeaders(){
        this.requestHeader = new RequestHeader(TokenRequest.authToken);
    }

  	getBookingByShippingLineData(facilityId){
  		return Promise.resolve(this.http.get(TokenRequest.apiBaseUrl + ApiSettings.BOOKING_BY_SHIPPING_LINE_URL, {headers: this.requestHeader.options.headers}).toPromise());
    }


}
