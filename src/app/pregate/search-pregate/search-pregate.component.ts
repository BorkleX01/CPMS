import { Component, ElementRef, OnInit } from '@angular/core';
import { SelectItem, Message } from 'primeng/primeng';
import { AppContainerComponent } from '../../app-container/app-container.component';
import { Applog } from '../../applog';
import { Router, ActivatedRoute } from '@angular/router';

import { Http, Response } from '@angular/http';
import { PregateDetailComponent} from '../pregate-detail/pregate-detail.component';
import { PregateService } from '../pregate.service';

import { CommonService } from '../../shared/common.service';

import { PregateSearch } from '../data-models/pregate-search';

@Component({
  selector: 'app-search-pregate',
  templateUrl: './search-pregate.component.html',
  styleUrls: ['./search-pregate.component.css'],
  providers:[ PregateService ]
})
export class SearchPregateComponent implements  OnInit {

		//@ViewChild('detail') pregateDetail: PregateDetailComponent;	

	  	private isHistory:boolean = false;
	  	private columnOptions: SelectItem[];
	    private selectedColumns: any = ["ContainerNumber","ContainerNumberTo","ApplyHold","StartDate","EndDate", "CustomerCode", "CustomerName"];
	    private currentData:any = [];
	    private historyData:any = [];
	    private totalCount = 0;
	    private userMsgs: Message[];
	    private historyMsgs: Message[];
	    private historyFilter = new PregateSearch();
	    private pregateSearchOptions: SelectItem[];
	    private customerList: SelectItem[];

	  	constructor( private el: ElementRef, private applog:Applog, private http:Http, private pregateService:PregateService,private router: Router, private route: ActivatedRoute) { }

	  	ngOnInit() {
			
			this.getAllPregateList(); 	
	  		this.historyMsgs = [];
	  		if (this.historyData.length == 0) {
		            this.historyMsgs.push({
		                severity: 'info',
		                summary: 'No Data',
		                detail: 'Specify a date range and/or conditions and click on Search to view expired pregate conditions.'
		            });

		        }	
		    this.pregateSearchOptions = [];
	        this.pregateSearchOptions.push({label: 'Select', value: 'NONE'});        
	        this.pregateSearchOptions.push({label: 'Customer Code', value: 'CUSTOMER_ID'});
	        this.pregateSearchOptions.push({label: 'Container Number', value: 'CONTAINER_NO'});

	        this.customerList = CommonService.getCustomerList();
	  	}

	  	/*ngAfterViewInit() {
	  		
	  	}*/

	  	getAllPregateList(){

	  		
			this.userMsgs = [];
            this.pregateService.getAll().then(response => {
                var appCont = new AppContainerComponent(this.applog, this.el, this.http);
       			this.currentData = appCont.extractTableData(response, this.selectedColumns);
	  			this.totalCount = appCont.getTotalCount();
	  			this.columnOptions = appCont.getColumnOptions();
	  			for(let pregate of(this.currentData)){
	  				for(let cust of CommonService.referenceData[0].Data){
		                if(cust.Id == pregate.CustomerId){
		                    pregate.CustomerCode = cust.Code;
		                    pregate.CustomerName = cust.Name;
		                }
	  				}	  			
            	}
            	this.userMsgs = [];
            	if (this.currentData.length == 0) {
		            this.userMsgs.push({
		                severity: 'warn',
		                summary: 'No Data',
		                detail: 'No active Pre-gate exists.'
		            });

		        }
            }).catch((res) => {
	        	this.currentData = [];
	        	if (this.currentData.length == 0) {
		            this.userMsgs.push({
		                severity: 'warn',
		                summary: 'No Data',
		                detail: 'No active Pre-gate exists.'
		            });

		        }
	            this.applog.dataError(res)
	        });

			
	  	}

	  	viewDetail(event){
	  		let link = ['/pregatedetail', event.data.Id.toString()];
        	this.router.navigate(link);
	  	}

	  	searchHistory(){

	  		this.pregateService.getHistory(this.historyFilter).then(response => {
                var appCont = new AppContainerComponent(this.applog, this.el, this.http);
       			this.historyData = appCont.extractTableData(response, this.selectedColumns);
	  			this.totalCount = appCont.getTotalCount();
	  			this.columnOptions = appCont.getColumnOptions();
	  			for(let pregate of(this.historyData)){
	  				for(let cust of CommonService.referenceData[0].Data){
		                if(cust.Id == pregate.CustomerId){
		                    pregate.CustomerCode = cust.Code;
		                    pregate.CustomerName = cust.Name;
		                }
	  				}	  			
            	}

            	this.historyMsgs = [];
		  		if (this.historyData.length == 0) {
		            this.historyMsgs.push({
		                severity: 'warn',
		                summary: 'No Data',
		                detail: 'No pregates found for the mentioned criteria.'
		            });

		        }	
            }).catch((res) => {
	        	this.historyData = [];	        	
	            this.applog.dataError(res)
	        });



	  	}

}
