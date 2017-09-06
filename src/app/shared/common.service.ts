import { OnInit } from '@angular/core';
import {SelectItem } from'primeng/primeng';


export class CommonService {

	public static referenceData;
	public static hasReferenceData;
	public static customerList : SelectItem[];


  	constructor() { }

  	public static getCustomerList(){

  		this.customerList = [];
        this.customerList.push({label: 'Select', value: ''});

        for(let customer of CommonService.referenceData[0].Data){
            this.customerList.push({label: customer.Code, value: customer.Id})
        }
        return this.customerList;
  	}



}
