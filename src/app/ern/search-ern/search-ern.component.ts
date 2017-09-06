import { Component, OnInit, ElementRef } from '@angular/core';
import { ERNService } from '../ern.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Response,Http } from '@angular/http';

import { ERNSearch } from '../data-models/ern-search';

import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/primeng';
import { AppContainerComponent } from '../../app-container/app-container.component';
import { Applog } from '../../applog';

@Component({
    selector: 'search-ern',
    templateUrl: './search-ern.component.html',
    styleUrls: ['./search-ern.component.css'],
    providers: [ERNService]
})

export class SearchERNComponent implements OnInit {


    //openFilter;
    historyFilter;
    date;
    isHistory: boolean = false;
    historyList = new Array < any > ();
    filterOptions: SelectItem[];
    userMsgs: Message[] = [];
    resultObj = new Array < any > ();
    private selectedColumns:any = ["ShippingLineName","ErnNumber", "QuantityOrdered", "QuantityReleased", "QuantityPending","ExpectedReleaseDate","LastReleaseDate"];
    private totalCount = 0;


    constructor(private ernService: ERNService, private router: Router, private route: ActivatedRoute, private applog:Applog, private el: ElementRef, private http:Http) {}

    ngOnInit() {

        this.filterOptions = [];
        this.filterOptions.push({label: 'Select', value: null});
        this.filterOptions.push({label: 'Shipping Line', value: 'CUSTOMER_CODE'});
        this.filterOptions.push({label: 'Release No#', value: 'RELEASE_NO'});
        this.historyFilter = new ERNSearch();
        //this.openFilter = new ERNSearch();
        this.historyFilter.FieldValue = "";
        //this.openFilter.FieldValue = "";

        this.isHistory = this.route.snapshot.data[0]['isHistory'];
        if (!this.isHistory) {
            /*this.openFilter.ERNSearchFilter = "CUSTOMER_CODE";
            this.openFilter.FieldValue = "HSD";*/
            this.searchOpenERNs();
        } else {
            this.searchERNHistory();
        }
    }

    applyFilters() {
        this.ernService.searchERNHistory(this.historyFilter).then(res => {
            this.setHistoryTableData(res);
            this.userMsgs = [];
            if (this.historyList.length == 0) {
                this.userMsgs.push({
                    severity: 'warn',
                    summary: 'No Data',
                    detail: 'No Records to display.'
                });
            }
        });

    }

    searchOpenERNs() {

        this.isHistory = false;
        this.selectedColumns = ["ShippingLineName","ErnNumber", "QuantityOrdered", "QuantityReleased", "QuantityPending","ExpectedReleaseDate","LastReleaseDate"];
        /*this.openFilter.FromDate = "";
        this.openFilter.ToDate = "";*/


        var noOfMonths = 2;
        this.ernService.getAllERN(noOfMonths).then(res => {
            this.setOpenTableData(res);
            this.userMsgs = [];
            if (this.resultObj.length == 0) {
                this.userMsgs.push({
                    severity: 'warn',
                    summary: 'No Data',
                    detail: 'No Records to display.'
                });
            }
            console.log(this.resultObj.length);
        });
    }

    viewERNDetail(event) {

        let link = ['/erndetail', event.data.ErnNumber.toString()];
        this.router.navigate(link);
    }

    searchERNHistory() {
        this.isHistory = true;
        /*this.historyFilter = new ERNSearch();
        this.historyFilter.FieldValue = "";*/
        this.selectedColumns = ["ShippingLineName","ErnNumber", "QuantityOrdered", "QuantityReleased", "QuantityPending","ExpectedReleaseDate","LastReleaseDate","ERNStatus"];

        if (this.historyList.length == 0) {
            this.userMsgs = [];
            this.userMsgs.push({
                severity: 'warn',
                summary: 'No Data',
                detail: 'No Records to display.'
            });

        }

    }

    changeTab(event) {
        if (event.index == 0) {
            /*this.openFilter.ERNSearchFilter = "CUSTOMER_CODE";
            this.openFilter.FieldValue = "HSD";*/
            this.searchOpenERNs();
        } else if (event.index == 1) {
            this.searchERNHistory();
        }
    }

    setOpenTableData(res:Response){
        
        var appCont = new AppContainerComponent(this.applog, this.el,this.http);
        this.resultObj = appCont.extractTableData(res, this.selectedColumns);
        this.totalCount = appCont.getTotalCount();
        //this.columnOptions = appCont.getColumnOptions();
        //this.selectedColumns = ["Id","ShippingLineCode","ContainerISOCode","ContainerNumber","FromFacilityCode","ToFacilityCode","StartDate","EndDate"];
    }

    setHistoryTableData(res:Response){
        
        var appCont = new AppContainerComponent(this.applog, this.el, this.http);
        this.historyList = appCont.extractTableData(res, this.selectedColumns);
        this.totalCount = appCont.getTotalCount();
        //this.columnOptions = appCont.getColumnOptions();
        //this.selectedColumns = ["Id","ShippingLineCode","ContainerISOCode","ContainerNumber","FromFacilityCode","ToFacilityCode","StartDate","EndDate"];
    }
}