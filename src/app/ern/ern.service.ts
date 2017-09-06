import { Injectable, Input } from '@angular/core';
import { Headers, RequestOptions, Http, Response, HttpModule } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

import { RequestHeader } from '../shared/request-header';
import { TokenRequest } from '../shared/token-request';

import { ERN } from './data-models/ern';
import { ApiSettings } from '../shared/api-settings'

@Injectable()
export class ERNService {

    requestHeader;
   
     constructor(private http: Http) {
        this.getHeaders();
    }

    getHeaders(){
        this.requestHeader = new RequestHeader(TokenRequest.authToken);
    }

    viewERNDetail(ernNumber:string){

        return Promise.resolve(this.http.get(TokenRequest.apiBaseUrl + ApiSettings.ERN_DETAIL_URL+ernNumber, {headers: this.requestHeader.options.headers}).toPromise());
    }

    saveERN(updatedERN: ERN){
      
        var reqBody = JSON.stringify(updatedERN);
        return Promise.resolve(this.http.put(TokenRequest.apiBaseUrl + ApiSettings.UPDATE_ERN_URL, reqBody, {headers: this.requestHeader.options.headers}).toPromise());
    }

    closeERN(ernNumber){

        return Promise.resolve(this.http.delete(TokenRequest.apiBaseUrl + ApiSettings.DELETE_ERN_URL+ernNumber, {headers: this.requestHeader.options.headers}).toPromise());
    }

    createERN(newERN:ERN){
        
        var reqBody = JSON.stringify(newERN);

        return Promise.resolve(this.http.post(TokenRequest.apiBaseUrl + ApiSettings.CREATE_ERN_URL, reqBody, this.requestHeader.options).toPromise());
    }

    searchERN(searchObj){
      
        var reqBody = JSON.stringify(searchObj);
        return Promise.resolve(this.http.post(TokenRequest.apiBaseUrl + ApiSettings.SEARCH_ERN_URL, reqBody, this.requestHeader.options).toPromise());
      
    }

    getAllERN(noOfMonths){
        
        return Promise.resolve(this.http.get(TokenRequest.apiBaseUrl + ApiSettings.ERN_GET_ALL_URL+noOfMonths, {headers: this.requestHeader.options.headers}).toPromise()); 
    }

    searchERNHistory(searchObj){
        var reqBody = JSON.stringify(searchObj);
        return Promise.resolve(this.http.post(TokenRequest.apiBaseUrl + ApiSettings.SEARCH_ERN_HISTORY_URL, reqBody, this.requestHeader.options).toPromise());

    }

}
