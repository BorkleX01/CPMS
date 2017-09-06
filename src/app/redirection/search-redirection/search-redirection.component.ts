import { Component, OnInit, ElementRef } from '@angular/core';

import { RedirectionService } from '../redirection.service';
import { Applog } from '../../applog';
import { AppContainerComponent } from '../../app-container/app-container.component';

import { SelectItem } from 'primeng/primeng';
import { Router, ActivatedRoute } from '@angular/router';
import { RedirectionSearch } from '../data-models/redirection-search';
import { Response, Http } from '@angular/http';
import { Message } from 'primeng/primeng';



@Component({
    selector: 'app-search-redirection',
    templateUrl: './search-redirection.component.html',
    styleUrls: ['./search-redirection.component.css'],
    providers: [RedirectionService]
})
export class SearchRedirectionComponent implements OnInit {

    private tableData:any = ['nothing here'];
    private totalCount = 0;
    private columnOptions: SelectItem[];
    private selectedColumns:any = ["ShippingLineCode","ContainerISOCode", "StartDate", "EndDate", "ContainerNumber","FromFacilityCode","ToFacilityCode",];
    private isActive:boolean; 
    filter = new RedirectionSearch();
    userMsgs: Message[] = [];


    constructor(private redirectionService:RedirectionService, private applog: Applog, private router: Router, private route: ActivatedRoute, private el: ElementRef, private http:Http) { }

    ngOnInit() { 

        this.isActive = this.route.snapshot.data[0]['isActive'];
        this.getActiveRedirections();
        this.filter.FromDate = "";
        this.filter.ToDate = "";
    }

    changeTab(event){
        this.isActive = !this.isActive;
        if(event.index == 0){
            this.getActiveRedirections();
        } else if(event.index == 1){
            this.getInactiveRedirections();
        }
    }

    viewRedirectionDetail(event){
        let link = ['/redirectiondetail', event.data.Id.toString()];  
        this.router.navigate(link);
    }

    viewInactiveRedirectionDetail(){
        console.log("Need to redirect to detail based on inactive status.");
        console.log("Currently no API to retrieve inactive redirection details.");
    }


    

    getActiveRedirections(){
        this.redirectionService.getActiveRedirections().then( res => {
            this.setTableData(res);
            this.userMsgs = [];
            if (this.tableData.length == 0) {
                this.userMsgs.push({
                    severity: 'warn',
                    summary: 'No Data',
                    detail: 'There are no active redirections.'
                });
            }
        }).catch((errObj:any)=>{
            this.applog.dataError(errObj);
        });
    }

    getInactiveRedirections(){
        this.resetTableData();
        this.userMsgs = [];
            if (this.tableData.length == 0) {
                this.userMsgs.push({
                    severity: 'info',
                    summary: 'Search',
                    detail: 'Specify a date range and click on Search to view historical redirection details.'
                });
            }
    }

    applyFilters(){
        this.redirectionService.getInactiveRedirections(this.filter).then(res => { 
            this.setTableData(res);
            this.userMsgs = [];
            if (this.tableData.length == 0) {
                this.userMsgs.push({
                    severity: 'warn',
                    summary: 'No Data',
                    detail: 'No Records to display for the specified date range'
                });
            }
        });
    }

    setTableData(res:Response){
        
        var appCont = new AppContainerComponent(this.applog, this.el, this.http);
        this.tableData = appCont.extractTableData(res, this.selectedColumns);
        this.totalCount = appCont.getTotalCount();
        this.columnOptions = appCont.getColumnOptions();
        //this.selectedColumns = ["Id","ShippingLineCode","ContainerISOCode","ContainerNumber","FromFacilityCode","ToFacilityCode","StartDate","EndDate"];
    }

    resetTableData(){
        this.tableData = [];
        this.totalCount = 0
        this.columnOptions = [];
        this.selectedColumns = [];


    }

}
