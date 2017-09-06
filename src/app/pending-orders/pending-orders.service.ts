import { Injectable, Input } from '@angular/core';
import { Headers, RequestOptions, Http, Response, HttpModule } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';


import { RequestHeader } from '../shared/request-header';
import { TokenRequest } from '../shared/token-request';

import { AppointmentSearch } from '../data-models/appointment-search';
import { ApiSettings } from '../shared/api-settings'

@Injectable()
export class PendingOrdersService {
		private requestHeader;
		getHeaders(){
   	    this.requestHeader = new RequestHeader(TokenRequest.authToken);
   	}
  	constructor(private http: Http) { }

  	searchBookings(appointmentSearch: AppointmentSearch){

  			this.getHeaders();
   			var reqBody = JSON.stringify(appointmentSearch);

   			return Promise.resolve(this.http.post(TokenRequest.apiBaseUrl + ApiSettings.SEARCH_BOOKING_URL, reqBody, this.requestHeader.options).toPromise());
  	}

		gateIn(reqBody:any){
				this.getHeaders();
				return Promise.resolve(this.http.post(TokenRequest.apiBaseUrl + ApiSettings.YARD_GATE_IN, reqBody, this.requestHeader.options).toPromise());
				
		}

		dropOff(bookingID:any){
				this.getHeaders();
				var reqBody = {"BookingId":bookingID};
				return Promise.resolve(this.http.post(TokenRequest.apiBaseUrl + ApiSettings.BOOKING_GATE_IN, reqBody, this.requestHeader.options).toPromise());
		}

		pickUp(bookingID:any, containerNo:any){
				this.getHeaders();
				var reqBody = {
						"BookingId": bookingID,
						"ContainerNo": containerNo
				};
				return Promise.resolve(this.http.post(TokenRequest.apiBaseUrl + ApiSettings.BOOKING_GATE_OUT, reqBody, this.requestHeader.options).toPromise());
		}

}
