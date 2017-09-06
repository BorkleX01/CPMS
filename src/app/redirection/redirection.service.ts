import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { RequestHeader } from '../shared/request-header';
import { TokenRequest } from '../shared/token-request';

import { ApiSettings } from '../shared/api-settings';

@Injectable()
export class RedirectionService {

    requestHeader;
    getHeaders(){
        this.requestHeader = new RequestHeader(TokenRequest.authToken);
     }

    constructor(private http: Http) {
        this.getHeaders();
    }

    viewRedirectionDetail(redirectionId){        
        return Promise.resolve(this.http.get(TokenRequest.apiBaseUrl + ApiSettings.REDIRECTION_DETAIL_URL+redirectionId, {headers: this.requestHeader.options.headers}).toPromise());    
    }

    deleteRedirection(redirectionId){
        return Promise.resolve(this.http.delete(TokenRequest.apiBaseUrl + ApiSettings.DELETE_REDIRECTION_URL+redirectionId, {headers: this.requestHeader.options.headers}).toPromise());
    }

    saveRedirection(newObj, Id){
        var reqBody = JSON.stringify(newObj);
        return Promise.resolve(this.http.put(TokenRequest.apiBaseUrl + ApiSettings.UPDATE_REDIRECTION_URL+Id, reqBody, {headers: this.requestHeader.options.headers}).toPromise());

    }

    getActiveRedirections(){
        return Promise.resolve(this.http.get(TokenRequest.apiBaseUrl + ApiSettings.ACTIVE_REDIRECTIONS_URL, {headers: this.requestHeader.options.headers}).toPromise());
    
    }

    getInactiveRedirections(redirectionSearch){
        var reqBody = JSON.stringify(redirectionSearch);
        return Promise.resolve(this.http.post(TokenRequest.apiBaseUrl + ApiSettings.INACTIVE_REDIRECTIONS_URL, reqBody, this.requestHeader.options).toPromise());
    }

    createRedirection(createObj){
        var reqBody = JSON.stringify(createObj);

        return Promise.resolve(this.http.post(TokenRequest.apiBaseUrl + ApiSettings.CREATE_REDIRECTION_URL, reqBody, this.requestHeader.options).toPromise());
    }

}