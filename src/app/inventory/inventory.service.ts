import { Injectable } from '@angular/core';
import { ApiSettings } from '../shared/api-settings';
import { Headers, RequestOptions, Http, Response, HttpModule } from '@angular/http';
import { TokenRequest } from '../shared/token-request';
import { RequestHeader } from '../shared/request-header';
import { InventorySearch } from './data-models/inventory-search';

@Injectable()
export class InventoryService {
    requestHeader;
    getHeaders() {
        this.requestHeader = new RequestHeader(TokenRequest.authToken);
    }

    constructor(private http: Http) {
        this.getHeaders();
    }
    
    getAll() {

        //return Promise.resolve(this.http.get(TokenRequest.apiBaseUrl + ApiSettings.INVENTORY_GET_ALL_URL, { headers: this.requestHeader.options.headers }).toPromise());
        return Promise.resolve(this.http.get("assets/data/inventory-getall.json").toPromise())
    }

    getContainersByCustomerId(searchObj: InventorySearch) {
        var reqBody = JSON.stringify(searchObj);

        return Promise.resolve(this.http.post(TokenRequest.apiBaseUrl + ApiSettings.SEARCH_INVENTORY_URL, reqBody, this.requestHeader.options).toPromise());
    }

    getHistory(searchObj: InventorySearch) {
    	var reqBody = JSON.stringify(searchObj);

        return Promise.resolve(this.http.post(TokenRequest.apiBaseUrl + ApiSettings.INVENTORY_HISTORY_SEARCH, reqBody, this.requestHeader.options).toPromise());        
    }

    searchInventory(searchObj: InventorySearch){
    	var reqBody = JSON.stringify(searchObj);
    	
        return Promise.resolve(this.http.post(TokenRequest.apiBaseUrl + ApiSettings.INVENTORY_SEARCH, reqBody, this.requestHeader.options).toPromise());   
    }

    viewContainerDetail(containerId) {

        //return Promise.resolve(this.http.get(TokenRequest.apiBaseUrl + ApiSettings.CONTAINER_DETAIL_URL+containerId, {headers: this.requestHeader.options.headers}).toPromise());
        return Promise.resolve(this.http.get("assets/data/inventory-detail.json").toPromise())
    }

    updateHoldStatus(holdObj){
        var reqBody = JSON.stringify(holdObj);
        
        return Promise.resolve(this.http.post(TokenRequest.apiBaseUrl + ApiSettings.CONTAINER_HOLD_RELEASE_URL, reqBody, this.requestHeader.options).toPromise());   
    }

    getAvailableContainersForGateout(searchObj: InventorySearch){
        var reqBody = JSON.stringify(searchObj);

        return Promise.resolve(this.http.post(TokenRequest.apiBaseUrl + ApiSettings.GET_AVAILABLE_URL, reqBody, this.requestHeader.options).toPromise());
    }

    getMovementLogForContainer(searchObj){
        var reqBody = JSON.stringify(searchObj);

        return Promise.resolve(this.http.post(TokenRequest.apiBaseUrl + ApiSettings.MOVEMENT_LOG_URL, reqBody, this.requestHeader.options).toPromise());
    }

    updateInventoryDetails(updateObj, containerId){
        var reqBody = JSON.stringify(updateObj);

        return Promise.resolve(this.http.put(TokenRequest.apiBaseUrl + ApiSettings.EDIT_INVENTORY_URL+containerId, reqBody, {headers: this.requestHeader.options.headers}).toPromise());
    }
}

