import { Component, OnInit, ViewChild } from '@angular/core';
import {Http, Response} from '@angular/http';

import { AppointmentSearch } from '../data-models/appointment-search';
import 'rxjs/add/operator/catch';
import { OverlayPanelModule } from 'primeng/primeng';
import { DataTable } from 'primeng/primeng';
import { OverlayPanel } from 'primeng/primeng';
import { SelectItem } from 'primeng/primeng';
import { MegaMenuModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { Router } from '@angular/router';
import { Applog } from '../../applog';
import { InventoryService } from '../../inventory/inventory.service';
import { AppContainerComponent } from '../../app-container/app-container.component';
import { Message } from 'primeng/primeng';
import { BookingService } from '../booking.service';

@Component({
    selector: 'pending-bookings',
    templateUrl: './pending-bookings.component.html',
    styleUrls: ['./pending-bookings.component.css'],
    providers: [BookingService, InventoryService]
})
export class PendingBookingsComponent implements OnInit {

		private bookingsDefaultUIsettings: any = {
				"sortState": {
						"sortField": "TimeZone",
						"sortOrder": -1,
						"multiSortMeta": [
								{
										"field": "TimeZone",
										"order": 1
								}
						]
				},
				"visibleColumnsState": [
                        "ExternalBookingReferenceNo",
						"ExternalBookingId",
						"MovementType",
						"Rego",
                        "BookingDate",
						"TimeZone",
						"ContainerNo",
						"ReleaseNo",
						"IsoCode",
						"CarrierCode",
						"CustomerName",
						"Status"
				],
				"paginationState": {
						"rows": 30,
						"pageLinkSize": 5,
						"first": 0
				},
				"columnSizes": [
                        {
                            "column": "ExternalBookingReferenceNo",
                            "width": "auto"
                        },
						{
								"column": "ExternalBookingId",
								"width": "auto"
						},
						{
								"column": "MovementType",
								"width": "auto"
						},
						{
								"column": "Rego",
								"width": "auto"
						},
                        {
                                "column": "BookingDate",
                                "width": "auto"
                        },
						{
								"column": "TimeZone",
								"width": "auto"
						},
						{
								"column": "ContainerNo",
								"width": "auto"
						},
						{
								"column": "ReleaseNo",
								"width": "auto"
						},
						{
								"column": "IsoCode",
								"width": "auto"
						},
						{
								"column": "CarrierCode",
								"width": "auto"
						},
						{
								"column": "CustomerName",
								"width": "auto"
						},
						{
								"column": "Status",
								"width": "auto"
						}
				]
		};
    private tableData: any = ['nothing here'];
    private tableHeadings: any = [];
    private showAll: boolean = true;

    private filter;
    private items: any = [{
        label: 'Gate In'
    }, {
        label: 'Arrived'
    }];
    private totalCount = 0;
    private cols: any = [];
    private columnOptions: SelectItem[];
    public selectedColumns: any = ["ExternalBookingReferenceNo","ExternalBookingId", "MovementType", "Rego", "TimeZone", "ContainerNo", "ReleaseNo", "IsoCode", "CarrierCode", "CustomerName", "Status"];
    private currentRecord: any = [];
    private containerList = [];
    private filteredContainerList = [];
    private gateOutContainerNo = "";
    private isGateOut: boolean = false;
    private gateOutCustomerId = "";
    private filterOptions: SelectItem[];
    private movementType: SelectItem[];
    private userMsgs: Message[] = [];
    private growlMsgs: Message[] = [];
    private isInvalid:boolean = false;
    private deleteConfirm:boolean = false;
    private gateInSuccess:boolean = false;
    private gateOutSuccess:boolean = false;
	private pollTimer = 60000;
	private poller:any;
	private polling:boolean = true;
    private availableContainerList:any[];

			

    constructor(private http: Http, private bookingService: BookingService, private router: Router, private applog: Applog, private inventoryService: InventoryService,
        private appCont: AppContainerComponent) {}

    ngOnInit() {
				this.poller = setInterval(()=>{this.refresh()}, this.pollTimer);
        this.userMsgs = [];
        this.filter = new AppointmentSearch();
        this.filter.TodayOnly = true;
        this.filter.BookingSearchFilter = "NONE";
        this.filter.MovementTypeFilter = "BOTH";
        this.searchBookings(this.filter);

				//setTimeout(()=>{console.log("start polling");setInterval(()=>{this.refresh()},60000)},60000);
        //this.stacked = true;
				//this.pollTimer = setInterval(()=>{this.poller()},5000);
				
				
				
        this.items = [{
            label: 'View Details',
            icon: 'fa-check',
            command: () => {
                let link = ['/bookingdetail', this.currentRecord.Id.toString()];
                this.navigateToDetail(link);
            }
        }, {
            label: 'Gate-In',
            icon: 'fa-plus',
            command: (a, b, c) => {
                this.gateIn(this.currentRecord);
            }
        }, {
            label: 'Truck Gate-in',
            icon: 'fa-truck',
            command: (a) => {}
        }, {
            label: 'Gate-out',
            icon: 'fa-minus',
            command: (a) => {
                this.openGateOutModal();
            }
        }];
        this.filterOptions = [];
        this.filterOptions.push({label: 'Select', value: null});
        this.filterOptions.push({label: 'Rego#', value: 'REGO'});
        this.filterOptions.push({label: 'Carrier', value: 'CARRIER_NO'});
        this.filterOptions.push({label: 'Container No#', value: 'CONTAINER_NO'});
        this.filterOptions.push({label: 'Shipping Line', value: 'CUSTOMER_CODE'});
        this.filterOptions.push({label: 'Release No#', value: 'RELEASE_NO'});
        this.filterOptions.push({label: 'Booking ref#', value: 'BOOKING_REF'});

        this.movementType = [];
        this.movementType.push({label: 'Pick Up', value: 'PICK_UP'});
        this.movementType.push({label: 'Drop Off', value: 'DROP_OFF' });
        this.movementType.push({label: 'Both', value: 'BOTH'});
    }

	menuHideFunction() {
        console.log("resume tick" + this.poller);
        this.poller = setInterval(()=>{this.refresh()}, this.pollTimer);
    }

    private showActions(event, row: any, overlaypanel: OverlayPanel) {
				
        this.currentRecord = row;
        overlaypanel.toggle(event);
    }

		

	visChange(e){
		console.log("visChange");
		this.selectedColumns = e;
		console.log(this.selectedColumns);
	};
		
    gateIn(row: any) {
        this.currentRecord = row;
		this.dropOff(this.currentRecord.Id);
		this.applog.simpleMessage("Updating: "+this.currentRecord.Id); // to be replaced with generic preloader/progress bar
    }

    refresh() {
		console.log("refresh");
        this.bookingService.searchBookings(this.filter).then(res => {
            this.tableData = this.extractTableData(res);
        }).catch((errObj: any) => {
            this.applog.dataError(errObj);
        });
    }
    dropOff(bookingID: any) {
        this.bookingService.dropOff(bookingID).then(res => {
            this.refresh();
			this.gateInSuccess = true;
			this.applog.closeNotification();
        });
    }

    openGateOutModal() {
        this.gateOutContainerNo = "";
        this.isGateOut = true; 

        var searchFilter:any = {};
        searchFilter.CustomerId = this.currentRecord.CustomerId;
        this.containerList = [];

        this.inventoryService.getAvailableContainersForGateout(searchFilter).then(res => {
            this.availableContainerList = res.json().Data;            
        });
    }

    filterContainers(event) {
        this.containerList = [];
        for (var container of this.availableContainerList) {
            this.containerList.push(container.ContainerNo);

            this.filteredContainerList = this.filterContainerList(event.query, this.containerList);
        }
    }

    filterContainerList(query, containers: any[]): any[] {
        let filtered: any[] = [];
        for (let i = 0; i < containers.length; i++) {
            let container = containers[i];
            if (container.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(container);
            }
        }
        return filtered;

    }

    pickUp() {
        this.isGateOut = false;
        this.bookingService.pickUp(this.currentRecord.Id, this.gateOutContainerNo).then(res => {
            this.refresh();
            this.gateOutSuccess = true;
        });
    }
    extractTableData(res: Response): any[] {
        let body = res.json();
        if ((body.Data[0] != null) && (body.Data[0] != undefined)) {
            this.userMsgs = [];
            if (this.showAll) {
                this.tableHeadings = Object.keys(body.Data[0]);
            }

            this.populateColumnSelector();
            this.totalCount = body.Data.length;
            return body.Data;
        } else {
            this.totalCount = 0;
            this.userMsgs = [];
            this.userMsgs.push({
                severity: 'warn',
                summary: 'No Data',
                detail: 'There are no records for the selected criteria.'
            });
        }
    }

    populateColumnSelector() {
        this.columnOptions = [];
        
        for (let i = 0; i < this.tableHeadings.length; i++) {
            if(this.selectedColumns.indexOf(this.tableHeadings[i]) != -1){
                this.columnOptions.push({
                label: this.tableHeadings[i],
                value: this.tableHeadings[i]
                });
            }
            
        }
        
    }

    sButtonClick(row) {
				if(this.polling){
						this.polling = false;
						console.log("stop poller: "+ this.poller);
						clearInterval(this.poller);
				}else{
						this.polling = true;
				}
        this.currentRecord = row;
        //console.log();
        if (this.currentRecord["MovementType"] == "PICK_UP" ) {

            if(this.currentRecord["Status"] == 'PENDING'){
                this.items = [{
                    label: 'View Details',
                    icon: 'fa-check',
                    command: () => {
                        let link = ['/bookingdetail', this.currentRecord.Id.toString()];
                        this.navigateToDetail(link);
                    }
                },{
                    label: 'Gate-out',
                    icon: 'ui-icon-minus',
                    command: (a) => {
                        this.openGateOutModal();
                    }
                },{
                    label: 'Delete',
                    icon: 'ui-icon-close',
                    command: (a) => {
                        this.deleteConfirm = true;
                    }
                }];
            } else if(this.currentRecord["Status"] == 'JOB_COMPLETE'){
                this.items = [{
                    label: 'View Details',
                    icon: 'fa-check',
                    command: () => {
                        let link = ['/bookingdetail', this.currentRecord.Id.toString()];
                        this.navigateToDetail(link);
                    }
                },{
                    label: 'Truck Gate-out',
                    icon: 'ui-icon-minus',
                    command: (a) => {
                        console.log("Truck gate out");
                    }
                },{
                    label: 'Delete',
                    icon: 'ui-icon-close',
                    command: (a) => {
                        this.deleteConfirm = true;
                    }
                }];
            }
            
        }
        else if (this.currentRecord["MovementType"] == "DROP_OFF") {
            if(this.currentRecord["Status"] == 'PENDING'){
                this.items = [{
                    label: 'View Details',
                    icon: 'fa-check',
                    command: () => {
                        let link = ['/bookingdetail', this.currentRecord.Id.toString()];
                        this.navigateToDetail(link);
                    }
                }, {
                    label: 'Gate-In',
                    icon: 'ui-icon-plus',
                    command: (a, b, c) => {
                        this.gateIn(this.currentRecord);
                    }
                },{
                    label: 'Delete',
                    icon: 'ui-icon-close',
                    command: (a) => {
                        this.deleteConfirm = true;
                    }
                }];
            } else if(this.currentRecord["Status"] == 'JOB_COMPLETE'){
            
                this.items = [{
                    label: 'View Details',
                    icon: 'fa-check',
                    command: () => {
                        let link = ['/bookingdetail', this.currentRecord.Id.toString()];
                        this.navigateToDetail(link);
                    }
                },{
                    label: 'Truck Gate-out',
                    icon: 'ui-icon-minus',
                    command: (a) => {
                        console.log("Truck gate out");
                    }
                },{
                    label: 'Delete',
                    icon: 'ui-icon-close',
                    command: (a) => {
                        this.deleteConfirm = true;
                    }
                }];
            }            
        }
				else this.items = [];
    }

   
    searchBookings(searchReq) {
        this.bookingService.searchBookings(searchReq).then(res => {
            this.tableData = this.extractTableData(res);
            if(searchReq.TodayOnly){
                this.selectedColumns = ["ExternalBookingReferenceNo","ExternalBookingId", "MovementType", "Rego", "TimeZone", "ContainerNo", "ReleaseNo", "IsoCode", "CarrierCode", "CustomerName", "Status"];
            }else{
                this.selectedColumns = ["ExternalBookingReferenceNo","ExternalBookingId", "MovementType", "Rego", "BookingDate", "TimeZone", "ContainerNo", "ReleaseNo", "IsoCode", "CarrierCode", "CustomerName", "Status"];
            }

            
        }).catch((errObj: any) => {
        	this.applog.dataError(errObj);              
        });
    }

    viewBookingDetail(event) {
        let link = ['/bookingdetail', event.data.Id.toString()];
        this.navigateToDetail(link);
        
    }

    navigateToDetail(link){
        this.router.navigate(link);
    }

    deleteBooking(){
        this.deleteConfirm = false;
        console.log("Deep linking to VBS will happen here");
    }

}
