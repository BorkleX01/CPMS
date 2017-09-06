import { Injectable } from '@angular/core';
import { ApiSettings } from '../shared/api-settings';
import { Headers, RequestOptions, Http, Response, HttpModule } from '@angular/http';
import { TokenRequest } from '../shared/token-request';
import { RequestHeader } from '../shared/request-header';

@Injectable()
export class PregateService {

  	requestHeader;
    getHeaders() {
        this.requestHeader = new RequestHeader(TokenRequest.authToken);
    }

    constructor(private http: Http) {
        this.getHeaders();
    }

    getAll(){
    	return Promise.resolve(this.http.get(TokenRequest.apiBaseUrl + ApiSettings.PREGATE_GET_ALL_URL, { headers: this.requestHeader.options.headers }).toPromise());
    }

    viewPregateDetail(pregateId){
    	return Promise.resolve(this.http.get(TokenRequest.apiBaseUrl + ApiSettings.PREGATE_DETAIL_URL+pregateId, { headers: this.requestHeader.options.headers }).toPromise());
    }

    updatePregateDetails(updateObj, pregateId){
    	var reqBody = JSON.stringify(updateObj);
    	return Promise.resolve(this.http.put(TokenRequest.apiBaseUrl + ApiSettings.EDIT_PREGATE_URL+pregateId, reqBody, {headers: this.requestHeader.options.headers}).toPromise());    
    }

    createNewPregate(createObj){
    	var reqBody = JSON.stringify(createObj);
    	return Promise.resolve(this.http.post(TokenRequest.apiBaseUrl + ApiSettings.CREATE_PREGATE_URL, reqBody, this.requestHeader.options).toPromise());    
    }

    getHistory(searchObj){
    	var reqBody = JSON.stringify(searchObj);
    	return Promise.resolve(this.http.post(TokenRequest.apiBaseUrl + ApiSettings.PREGATE_HISTORY_URL, reqBody, this.requestHeader.options).toPromise());
    }

    deletePregate(pregateId){
        return Promise.resolve(this.http.delete(TokenRequest.apiBaseUrl + ApiSettings.DELETE_PREGATE_URL+pregateId, {headers: this.requestHeader.options.headers}).toPromise());
    }

}
