import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { FacilityRedirection } from '../data-models/facility-redirection';
import { RedirectionService } from '../redirection.service';
import { Applog } from '../../applog';

import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-create-redirection',
  templateUrl: './create-redirection.component.html',
  styleUrls: ['./create-redirection.component.css'],
  providers: [RedirectionService]
})
export class CreateRedirectionComponent implements OnInit {

	constructor(private router:Router, private redirectionService:RedirectionService, private applog:Applog) { }

	private newRedirection = new FacilityRedirection();
	private createSuccess:boolean = false;
	private isInvalid:boolean = false;
	private invalidMessage = new Array<String>();
	private isValidRedirectionType:boolean = true;
	private createConfirm:boolean = false;
	private isMultiple:boolean = false;
	private duplicateId: string;
	private redirectionType:SelectItem[];

    private userMsgs: Message[] = [];
    private redirectionTypeMsgs: Message[] = [];

	ngOnInit() { 
		this.redirectionType = [];
        this.redirectionType.push({label: 'Single Container', value: 'SingleContainer'});
        this.redirectionType.push({label: 'Bulk Time Based', value: 'BulkTimeBased' });
	}

	goBack(){
		this.router.navigate(['./redirection/active']);
	}

	confirmRedirection(){
		this.isInvalid = this.validateCreateObject();

		if(!this.isInvalid){
			this.createConfirm = true;
		}else{
			this.userMsgs = [];
                    this.userMsgs.push({
                            severity: 'error',
                            summary: 'Invalid Form',
                            detail: "All fields are mandatory."
                    });
		}
	}

	createRedirection(){
		this.createConfirm = false;
		this.redirectionService.createRedirection(this.newRedirection).then( res => {
			this.createSuccess = true;
			this.userMsgs = [];
		}).catch((errObj:any)=>{
	        if(errObj.statusText == 'Bad Request'){
	            this.isInvalid = true;
	            var body = JSON.parse(errObj._body);

	            this.userMsgs = [];
                    this.userMsgs.push({
                            severity: 'error',
                            summary: 'Invalid Form',
                            detail: body.Data.Errors[0].Description
                    });
	            
	            if(body.Data.Errors[0].Description.indexOf('Duplicate') != -1){
	            	this.isMultiple = true;
	            	this.duplicateId = body.Data.Errors[0]["DuplicatedRecord"].Id;
	            	console.log("Duplicate id :",this.duplicateId);
	            }
	        } else{
	            this.applog.dataError(errObj);
	        }    
	    });
	}

	validateCreateObject(){
		if(this.newRedirection.RedirectionType == undefined || this.newRedirection.RedirectionType.length == 0){
			this.redirectionTypeMsgs =[];
			this.redirectionTypeMsgs.push({
                    severity: 'warn',
                    summary: 'Select Type',
                    detail: 'Select the type of redirection to be created.'
                });
			return true;
		} else{
			this.redirectionTypeMsgs =[];
		}
		if(this.newRedirection.RedirectionType === 'BulkTimeBased' && (this.newRedirection.ContainerISOCode == undefined || this.newRedirection.ContainerISOCode.length == 0)){
			return true;
		}

		if(this.newRedirection.RedirectionType === 'SingleContainer' && (this.newRedirection.ContainerNumber == undefined || this.newRedirection.ContainerNumber.length == 0)){
			return true;
		}

		if(!this.newRedirection.ShippingLineCode || this.newRedirection.ShippingLineCode.length == 0 ||
			!this.newRedirection.ToFacilityCode || this.newRedirection.ToFacilityCode.length == 0 ||
			!this.newRedirection.StartDate || this.newRedirection.StartDate.length == 0 ||
			!this.newRedirection.EndDate || this.newRedirection.EndDate.length == 0 ){

			return true;
		}

		return false;
	}

	selectRedirectionType(redirectionType:string){

		if('Single' == redirectionType){
			this.newRedirection.RedirectionType = 'SingleContainer';
		}else if('Time' == redirectionType){
			this.newRedirection.RedirectionType = 'BulkTimeBased';
		}
		
		this.newRedirection.ContainerISOCode = "";
		this.newRedirection.ContainerNumber = "";
		this.isValidRedirectionType = true;
	}

	redirectToDetail(){
		let link = ['/redirectiondetail', this.duplicateId.toString()];  
        this.router.navigate(link);
	}

}
