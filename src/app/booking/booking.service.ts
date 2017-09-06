import { Injectable, Input } from '@angular/core';
import { Headers, RequestOptions, Http, Response, HttpModule } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

import { RequestHeader } from '../shared/request-header';
import { TokenRequest } from '../shared/token-request';

import { ApiSettings } from '../shared/api-settings';
import { AppointmentSearch } from './data-models/appointment-search';

@Injectable()
export class BookingService {

    requestHeader;
   
     constructor(private http: Http) {
        this.getHeaders();
    }

     getHeaders(){
         this.requestHeader = new RequestHeader(TokenRequest.authToken);
     }

     viewBookingDetail(ernNumber:string){

         return Promise.resolve(this.http.get(TokenRequest.apiBaseUrl + ApiSettings.BOOKING_DETAIL_URL+ernNumber, {headers: this.requestHeader.options.headers}).toPromise());
    }

    searchBookings(appointmentSearch: AppointmentSearch){

      
        //var reqBody = JSON.stringify(appointmentSearch);
        //return Promise.resolve(this.http.post(TokenRequest.apiBaseUrl + ApiSettings.SEARCH_BOOKING_URL, reqBody, this.requestHeader.options).toPromise());
        return Promise.resolve(this.http.get("assets/data/sample-data.json").toPromise());
    }

    gateIn(reqBody:any){
        
        return Promise.resolve(this.http.post(TokenRequest.apiBaseUrl + ApiSettings.YARD_GATE_IN, reqBody, this.requestHeader.options).toPromise());
        
    }

    dropOff(bookingID:any){
         
        var reqBody = {"BookingId":bookingID};
        return Promise.resolve(this.http.post(TokenRequest.apiBaseUrl + ApiSettings.BOOKING_GATE_IN, reqBody, this.requestHeader.options).toPromise());
    }

    pickUp(bookingID:any, containerNo:any){
        
        var reqBody = {
          "BookingId": bookingID,
          "ContainerNo": containerNo
        };
        return Promise.resolve(this.http.post(TokenRequest.apiBaseUrl + ApiSettings.BOOKING_GATE_OUT, reqBody, this.requestHeader.options).toPromise());
    }


}