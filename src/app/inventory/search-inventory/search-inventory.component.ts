import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';
import 'rxjs/add/operator/catch';
import { Applog } from '../../applog';
import { Router } from '@angular/router';
import { InventorySearch } from '../data-models/inventory-search';
import { OverlayPanelModule } from 'primeng/primeng';
import { OverlayPanel } from 'primeng/primeng';
import { SelectItem } from 'primeng/primeng';

import { Http, Response } from '@angular/http';
import { Message } from 'primeng/primeng';
import { CommonService } from '../../shared/common.service';


@Component({
    selector: 'search-inventory',
    templateUrl: './search-inventory.component.html',
    styleUrls: ['./search-inventory.component.css'],
    providers: [InventoryService]
})
export class SearchInventoryComponent implements OnInit {
    constructor(private inventoryService: InventoryService, private applog: Applog, private router: Router, private http:Http) {}
    private inventoryDefaultUISettings: any = {

        "sortState": {
            "sortField": "Status",
            "sortOrder": -1/*,
                             "multiSortMeta": [
                             {
                             "field": "GateInDate",
                             "order": 1
                             }
                             ]*/
        },
        "visibleColumnsState": [
            "ContainerNo",
            "IsoCode",
            "Grade",
            "EmptyLaden",
            "Status",
            "IsHeld",
            "GateInRegoNo", 
            "GateInCarrierCode", 
            "CustomerNo", 
            "CustomerCode", 
            "CustomerName", 
            "GateInDate"                                                        
        ],
        "paginationState": {
            "rows": 18,
            "pageLinkSize": 5,
            "first": 0
        },
        "columnSizes": [
            {
                "column": "ContainerNo",
                "width": "auto"
            },
            {
                "column": "IsoCode",
                "width": "auto"
            },
            {
                "column": "Grade",
                "width": "auto"
            },
            {
                "column": "EmptyLaden",
                "width": "auto"
            },
            {
                "column": "Status",
                "width": "auto"
            },
            {
                "column": "IsHeld",
                "width": "auto"
            },
            {
                "column": "GateInRegoNo",
                "width": "auto"
            },
            {
                "column": "GateInCarrierCode",
                "width": "auto"
            },
            {
                "column": "CustomerNo",
                "width": "auto"
            },
            {
                "column": "CustomerCode",
                "width": "auto"
            },
            {
                "column": "CustomerName",
                "width": "auto"
            },
            {
                "column": "GateInDate",
                "width": "auto"
            }
            
        ],
        "filtersState": {
            "filters": {}
        }};
    private tableData: any = ['nothing here'];
    private historyData: any = [];
    private tableHeadingsDefault: any = ["ContainerNo","GateInDate","CarrierCode"];
    private tableHeadings: any = ["ContainerNo","IsoCode","Grade","EmptyLaden","Status","IsHeld","GateInRegoNo", "GateInCarrierCode", "CustomerNo", "CustomerCode", "CustomerName", "GateInDate"];
    private showAll: boolean = true;
    private filter;
    private items: any = [];
    private tempItems;		
    private totalCount = 0;
    private cols: any = [];
    private columnOptions: SelectItem[];
    private selectedColumns: any = ["ContainerNo","IsoCode","Grade","EmptyLaden","Status","IsHeld","GateInRegoNo", "GateInCarrierCode", "CustomerNo", "CustomerCode", "CustomerName", "GateInDate"];
    private containerSearchOptions: SelectItem[];
    private containerStatusOptions: SelectItem[];
    private userMsgs: Message[] = [];
    private isHistory:boolean = false;
    private currentFilter = new InventorySearch();
    private historyFilter = new InventorySearch();
    private holdOrReleaseComments = "";
    private isHold:boolean = false;
    private showComments:boolean = false;
    private holdSuccess:boolean = false;
    private showMessage:boolean = false;
    private customerList:SelectItem[] = [];
    private containerIds = [];
    private containerList = [];


    ngOnInit() {

    	this.containerSearchOptions = [];
        this.containerSearchOptions.push({label: 'Select', value: 'NONE'});        
        this.containerSearchOptions.push({label: 'Customer', value: 'CUSTOMER_ID'});
        this.containerSearchOptions.push({label: 'Container Number', value: 'CONTAINER_NO'});
        this.containerSearchOptions.push({label: 'Rego', value: 'REGO'});
        this.containerSearchOptions.push({label: 'Release No', value: 'RELEASE_NO'});


        this.containerStatusOptions = [];
        this.containerStatusOptions.push({label: 'Select', value: 'NONE'});
        this.containerStatusOptions.push({label: 'Pending', value: 'PND'});
        this.containerStatusOptions.push({label: 'To Be Surveyed', value: 'TBS'});
        this.containerStatusOptions.push({label: 'CSC', value: 'CSC'});
        this.containerStatusOptions.push({label: 'Wash', value: 'WSH'});
        this.containerStatusOptions.push({label: 'WSC', value: 'WSC'});
        this.containerStatusOptions.push({label: 'WPT', value: 'WPT'});
        this.containerStatusOptions.push({label: 'PTI', value: 'PTI'});
        this.containerStatusOptions.push({label: 'AWA', value: 'AWA'});
        this.containerStatusOptions.push({label: 'APP', value: 'APP'});
        this.containerStatusOptions.push({label: 'Available', value: 'AVL'});
        this.containerStatusOptions.push({label: 'Damaged', value: 'DAM'});
        this.containerStatusOptions.push({label: 'UNR', value: 'UNR'});
        this.containerStatusOptions.push({label: 'Repair', value: 'REP'});
        this.containerStatusOptions.push({label: 'Arrived', value: 'ARV'});


        this.historyFilter.FromDate = "";
        this.historyFilter.ToDate = "";
        this.currentFilter.FieldValue = "";
        this.tempItems = JSON.parse(JSON.stringify(this.items));
        
        
        this.getAllInventory();
        //setInterval(()=>{console.log("refresh");this.refresh()}, 60000);
    }

    extractTableData(res: Response): any[] {
        let body = res.json();
        if ((body.Data[0] != null) && (body.Data[0] != undefined)) {
            /*if (this.showAll) {
              this.tableHeadings = Object.keys(body.Data[0]);
              }*/
            this.populateColumnSelector();
            this.totalCount = body.Data.length;
            return body.Data;
        } else {
            body.Data = [];
            return body.Data;
        }
	//this.selectedColumns = ["ContainerNo","GateInDate","CarrierCode","CustomerCode","CustomerName","CustomerNo"];
    }

    populateColumnSelector() {
        this.columnOptions = [];
        for (let i = 0; i < this.tableHeadings.length; i++) {
            this.columnOptions.push({
                label: this.tableHeadings[i],
                value: this.tableHeadings[i]
            });
        }
        //this.selectedColumns = ["IsoCode","Grade","EmptyLaden","Status","IsHeld","RegoNo", "CarrierCode", "CustomerNo", "CustomerCode", "CustomerName", "GateInDate","ContainerNo"];
    }

    visChange(e){
        this.selectedColumns = e;
    };

    refresh() {
        this.inventoryService.getAll().then((res) => {
            this.tableData = this.extractTableData(res);
            
        }).catch((res) => {
            this.applog.dataError(res)
        });
    }

    searchCurrentInventory(){
    	this.isHistory = false;
    	if(this.currentFilter.FieldValue.length == 0){
    	    this.currentFilter = new InventorySearch();
    	    this.currentFilter.FieldValue = "";
    	    this.getAllInventory();
    	} else{
    	    console.log("cur filter: "+this.currentFilter);
    	    this.inventoryService.searchInventory(this.currentFilter).then((res) => {
	        this.tableData = this.extractTableData(res);
	        this.userMsgs = [];
	        if (this.tableData.length == 0) {
	            this.userMsgs.push({
	                severity: 'warn',
	                summary: 'No Data',
	                detail: 'No Records to display.'
	            });
	        }
	    }).catch((res) => {
	        this.tableData = [];
	        this.tableData.length = 0;
	        this.applog.dataError(res)
	    });
    	}
    }

    getAllInventory(){
    	this.inventoryService.getAll().then((res) => {
            this.tableData = this.extractTableData(res);
            this.userMsgs = [];
            if (this.tableData.length == 0) {
                this.userMsgs.push({
                    severity: 'warn',
                    summary: 'No Data',
                    detail: 'No Records to display.'
                });
            }
        }).catch((res) => {
            this.applog.dataError(res)
        });

        /*this.http.get('assets/data/inventory-getall.json').toPromise().then(response => {
          this.tableData = this.extractTableData(response);
          this.userMsgs = [];
          if (this.tableData.length == 0) {
          this.userMsgs.push({
          severity: 'warn',
          summary: 'No Data',
          detail: 'No Records to display.'
          });
          }
          }).catch((res) => {
          this.applog.dataError(res)
          });*/

    }

    searchHistory(){
    	console.log("this history filter: "+JSON.stringify(this.historyFilter));
        
        if(!this.historyFilter.ContainerSearchFilter){
            this.historyFilter.ContainerSearchFilter = 'NONE';
        }

        if(this.historyFilter.ContainerSearchFilter != 'NONE' && ( !this.historyFilter.FieldValue || this.historyFilter.FieldValue.length == 0)){
            
            this.historyData = [];
            this.userMsgs = [];
            this.userMsgs.push({
                severity: 'error',
                summary: 'Invalid Search',
                detail: 'Please enter a value.'
            });
        }else{
            this.inventoryService.getHistory(this.historyFilter).then((res) => {
                this.historyData = this.extractTableData(res);
                this.userMsgs = [];
                if (this.historyData.length == 0) {
                    this.userMsgs.push({
                        severity: 'warn',
                        summary: 'No Data',
                        detail: 'No Records to display.'
                    });
                }
            }).catch((res) => {
                this.historyData = [];
                this.historyData.length = 0;
                this.applog.dataError(res)
            });
        }
    }

    getHistory(){
    	this.isHistory = true;
        this.customerList = CommonService.getCustomerList();

    	if (this.historyData.length == 0) {
            this.userMsgs = [];
            this.userMsgs.push({
                severity: 'info',
                summary: 'No Data',
                detail: 'Specify a date range and/or conditions and click on Search to view historical inventory data.'
            });

        }
    }


    changeTab(event) {
    	console.log("his: ",this.historyFilter);
    	console.log("curr: ",this.currentFilter);
        if (event.index == 0) {
            this.searchCurrentInventory();
        } else if (event.index == 1) {
            this.getHistory();
        }
    }

    moreButtonClick(row){
        this.items = [];
        var item = {
            label: 'View Details',
            command: () => {
                let link = ['/inventorydetail', row.Id.toString()];
                this.navigateToDetail(link);
            }
        };
        this.items.push(item);           
        
        if(row.GateOutDate == null || row.GateOutDate.length == 0){
            if(row.IsHeld){
                item = {
                    label: 'Release from Hold',
                    command: () => {
                        this.containerIds = [];
                        this.containerIds.push(row.Id);
                        this.isHold = false;
                        //this.holdContainers(true);
                        this.showComments = true;
                    }
                }
            }else{
                item = {
                    label: 'Place on Hold',
                    command: () => {
                        this.containerIds = [];
                        this.containerIds.push(row.Id);
                        this.isHold = true;
                        //this.holdContainers(true);
                        this.showComments = true;
                    }
                }
            }
            this.items.push(item);
        }        
    }

    viewContainerDetail(event) {
        let link = ['/inventorydetail', event.data.Id.toString()];
        this.navigateToDetail(link);
        
    }

    navigateToDetail(link){
        this.router.navigate(link);
    }

    holdContainers(){
        let holdObj:any = {};
        holdObj.ContainerIds = this.containerIds;
        holdObj.Hold = this.isHold;
        holdObj.Comment = this.holdOrReleaseComments;

        this.inventoryService.updateHoldStatus(holdObj).then((res) => {            
            this.cancelHoldOrRelease();
            this.holdSuccess = true;
            this.refresh();
        }).catch((res) => {
            this.applog.dataError(res);
            this.cancelHoldOrRelease();
            this.refresh();

        });
    }

    cancelHoldOrRelease(){
        this.showComments = false;
        this.containerIds = [];
        this.containerList = [];
        this.holdOrReleaseComments = "";
        this.isHold = false;
        this.holdSuccess = false;
        this.showMessage = false;
    }

    //unwanted method - old logic - to be removed
    /*updateContainerIds(row){
      this.showMessage = false;
      if(this.isBulkHold === undefined){
      this.isBulkHold = JSON.parse(JSON.stringify(row.IsHeld));            
      }

      if(this.isBulkHold === row.IsHeld){
      if(row.checked){
      this.containerIds.push(row.Id);    
      }else if(!row.checked && this.containerIds.indexOf(row.Id) != -1){
      this.containerIds.splice(this.containerIds.indexOf(row.Id),1);
      if(this.containerIds.length == 0){
      this.isBulkHold = undefined;
      }
      if(this.containerIds.length == 1){
      this.showMessage = false;
      }
      }
      this.showButton = true;
      } else {
      if(!row.checked && this.containerIds.length == 1){
      this.showMessage = false;
      }else{
      this.showButton = false;
      this.showMessage = true;
      }
      
      }

      }*/

    selectRows(row){
        
        this.showMessage = false;
        this.containerIds = [];
        var baseIsHoldValue = undefined;

        
        if(this.containerList.length != 0){
            for(let container of this.containerList){
                if(row.Id == container.Id){
                    var index = this.containerList.indexOf(container);
                    this.containerList.splice(index,1);
                }
                if(baseIsHoldValue == undefined && container.checked){
                    baseIsHoldValue = container.IsHeld;
                }
            } 
        }

        this.containerList.push(row);  

        for(let container of this.containerList){
            if(container.IsHeld != baseIsHoldValue && container.checked && baseIsHoldValue != undefined){
                this.showMessage = true;
            }        
        }

        if(!this.showMessage){
            for(let container of this.containerList){
                if(container.checked){
                    this.containerIds.push(container.Id);
                }        
            }
        }
    }

    getLabel(){
        for(let row of this.tableData){
            if(this.containerIds[0] === row.Id){
                if(row.IsHeld){
                    return 'Release from Hold';
                } else {
                    return 'Place on Hold';        
                }    
            }
        }
    }

    doBulkHoldOrRelease(){
        if(this.getLabel() == 'Release from Hold'){
            this.isHold = false;
        } else if(this.getLabel() == 'Place on Hold'){
            this.isHold = true;
        }
        this.showComments = true;
    }

    clearFieldValue(){
        this.historyFilter.FieldValue = "";
    }
}
