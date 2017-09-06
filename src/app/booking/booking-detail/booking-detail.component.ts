import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BookingService } from '../booking.service';
import { Applog } from '../../applog';
import { InventoryService } from '../../inventory/inventory.service';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.css'],
  providers: [BookingService, InventoryService]
})
export class BookingDetailComponent implements OnInit {

    constructor(private route: ActivatedRoute, private bookingService:BookingService, private applog:Applog, private router:Router,
                private inventoryService:InventoryService) { }

    private bookingId;
    private bookingDetails = <any>Object;
    private editConfirm:boolean = false;
    private deleteConfirm: boolean = false;
    private gateOutContainerNo = "";
    private isGateOut:boolean = false;
    private containerList = [];
    private filteredContainerList = [];
    private gateInSuccess:boolean = false;
    private gateOutSuccess:boolean = false;

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            this.bookingId = id;          
        });

        this.getBookingDetail();
    }

    getBookingDetail(){
        this.bookingService.viewBookingDetail(this.bookingId).then(res => {
            this.bookingDetails = res.json().Data; 
            console.log("Booking details: "+JSON.stringify(this.bookingDetails));

        }).catch((errObj:any)=>{
            this.applog.dataError(errObj);
        });
    }
    goBack() {
        this.router.navigate(['/pendingbookings']);
    }

    editBooking(){
        this.editConfirm = false;
        console.log("Deep linking to VBS will happen here");
    }

    deleteBooking(){
        this.deleteConfirm = false;
        console.log("Deep linking to VBS will happen here");
    }

    getLabel(){
        if(this.bookingDetails.MovementType == 'PICK_UP'){
            if(this.bookingDetails.Status == 'PENDING'){
                return 'Gate-out';
            } else if(this.bookingDetails.Status == 'JOB_COMPLETE')    {
                return 'Truck Gate-out';
            }
        }

        if(this.bookingDetails.MovementType == 'DROP_OFF'){
            if(this.bookingDetails.Status == 'PENDING'){
                return 'Gate-in';
            } else if(this.bookingDetails.Status == 'JOB_COMPLETE')    {
                return 'Truck Gate-out';
            }
        }        
    }



    dropOff() {
        this.bookingService.dropOff(this.bookingDetails.Id).then(res => {
            this.getBookingDetail();
            this.gateInSuccess = true;
        });
    }

    openGateOutModal() {
        this.gateOutContainerNo = "";
        this.isGateOut = true;
    }

    filterContainers(event) {
        var searchFilter:any = {};
        searchFilter.CustomerId = this.bookingDetails.CustomerId;
        this.containerList = [];

        this.inventoryService.getAvailableContainersForGateout(searchFilter).then(res => {

            var containers = res.json().Data;
            for (var container of containers) {
                this.containerList.push(container.ContainerNo);

                this.filteredContainerList = this.filterContainerList(event.query, this.containerList);
            }
        });
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
        this.bookingService.pickUp(this.bookingDetails.Id, this.gateOutContainerNo).then(res => {
            this.getBookingDetail();
            this.gateOutSuccess = true;
        });
    }

    processBooking(){
        if(this.getLabel() == 'Gate-in'){
            this.dropOff();
        } else if (this.getLabel() == 'Gate-out'){
            this.pickUp();
        }
    }
}
