import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Applog } from '../../applog';
import { Http, Response } from '@angular/http';

import { InventoryService } from '../inventory.service';
import { BookingService } from '../../booking/booking.service';

import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.css'],
  providers: [InventoryService, BookingService]
})
export class InventoryDetailComponent implements OnInit {

    private containerId:string;
    private containerDetails =  <any>Object;
    private containerDetailsBackup = {};
    private gateInDetails = <any>Object;
    private gateOutDetails = <any>Object;
    private movementDetails = <any>Object;
    private editEnabled:boolean = false;
    private isCancelGateIn:boolean = false;
    private isCancelGateOut:boolean = false;
    private updatedDetails: any;
    private containerStatusOptions: SelectItem[];
    private containerTypeOptions: SelectItem[];
    private userMsgs: Message[] = [];
    private saveSuccess:boolean = false;

    constructor(private inventoryService:InventoryService, private route: ActivatedRoute, private applog:Applog, private router:Router, private http:Http,
                private bookingService:BookingService){
    }

    ngOnInit() {
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


        this.containerTypeOptions = [];
        this.containerTypeOptions.push({label: 'Empty', value: 'EMPTY'});
        this.containerTypeOptions.push({label: 'Full', value: 'LADEN'});

        this.updatedDetails = {};
        this.updatedDetails.AddedAlerts = [];

        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            this.containerId = id;          
        });

        this.getContainerDetail();
        
        if(this.containerDetails.GateOutDate && this.containerDetails.GateOutDate.length > 0){
            this.isCancelGateOut = this.isCancelApplicable(this.containerDetails.GateOutDate);
            
        } else{
            this.isCancelGateIn = this.isCancelApplicable(this.containerDetails.GateInDate);            
        }
    }

    isCancelApplicable(date){
        var hours = Math.abs(Date.parse(new Date().toISOString()) - Date.parse(date)) / 36e5;
        if(hours < 1){
            return true;
        } else {
            return false;
        }
    }

    getContainerDetail(){
        this.containerDetails.Lease={};
        this.movementDetails = [];
        this.inventoryService.viewContainerDetail(this.containerId).then(res => {
            this.containerDetails = res.json().Data; 
            console.log("container details: "+JSON.stringify(this.containerDetails));
            this.containerDetailsBackup = JSON.parse(JSON.stringify(this.containerDetails));

        }).catch((errObj:any)=>{
            this.applog.dataError(errObj);
        });
    }

    onTabChange(event){
        var tabs = [];
        this.resetValues();
        if(this.containerDetails.PreGates && this.containerDetails.PreGates.length > 0){
            if(this.containerDetails.GateOutDate && this.containerDetails.GateOutDate.length > 0){
                tabs = ['Alerts','Pre-Gate','Gate In','Gate Out','Leased','Movement'];
            }else{
                tabs = ['Alerts','Pre-Gate','Gate In','Leased','Movement'];
            }
        }else{
            if(this.containerDetails.GateOutDate && this.containerDetails.GateOutDate.length > 0){
                tabs = ['Alerts','Gate In','Gate Out','Leased','Movement'];
            }else{
                tabs = ['Alerts','Gate In','Leased','Movement'];
            }

        }

        if( tabs[event.index] === 'Gate In' ){
            this.bookingService.viewBookingDetail(this.containerDetails.GateInBookingId).then(res => {
                this.gateInDetails = res.json().Data; 

            }).catch((errObj:any)=>{
                this.applog.dataError(errObj);
            });
        } else if( tabs[event.index] === 'Gate Out' ){
            this.bookingService.viewBookingDetail(this.containerDetails.GateOutBookingId).then(res => {
                this.gateOutDetails = res.json().Data; 

            }).catch((errObj:any)=>{
                this.applog.dataError(errObj);
            });
        } else if( tabs[event.index] === 'Movement' ){
            console.log("Call movement api: ");
            let filter:any = {};
            filter.ContainerLogSearchOptions = "CONTAINER_NO";
            filter.FiledValues = this.containerDetails.ContainerNo;

            this.inventoryService.getMovementLogForContainer(filter).then(res => {
               this.movementDetails = res.json().ContainerLogs; 
                
            }).catch((errObj:any)=>{
                this.applog.dataError(errObj);
            });
        }
    }

    resetValues(){
        this.gateInDetails = <any>Object;
        this.gateOutDetails = <any>Object;
        this.movementDetails = [];

    }

    goBack(){
        this.router.navigate(['./inventory']);        
    }

    editDetail(){
        this.editEnabled = true;

        var temp:any = {};
        temp.Status = this.containerDetails.Status;
        temp.ManufactureDate = this.containerDetails.ManufactureDate;
        temp.Grade = this.containerDetails.Grade;
        temp.Rating = this.containerDetails.Rating;
        temp.Location = this.containerDetails.Location;
        temp.EmptyLaden = this.containerDetails.EmptyLaden;
        temp.GrossWeight = this.containerDetails.GrossWeight;
        temp.IsHeld = this.containerDetails.IsHeld;
        temp.Lessee = this.containerDetails.Lease.Lessee;
        temp.LesseeName = this.containerDetails.Lease.LesseeName;
        temp.OffHireDate = this.containerDetails.Lease.OffHireDate;
        temp.OnHireDate = this.containerDetails.Lease.OnHireDate;
        temp.SubReleaseNo = this.containerDetails.Lease.SubReleaseNo;
        temp.AddedAlerts = [];

        this.updatedDetails = temp;
    }

    saveDetail(){
        this.userMsgs = [];  
        for(let msg of this.updatedDetails.AddedAlerts){
            if(msg.Message.length == 0){
                this.userMsgs = [];                
                this.userMsgs.push({
                    severity: 'error',
                    summary: 'Invalid',
                    detail: 'Alerts cannot be empty.'
                });
                return;
            }
        }

        console.log("Updated details: ", JSON.stringify(this.updatedDetails));

        this.inventoryService.updateInventoryDetails(this.updatedDetails, this.containerDetails.Id).then(res => {
            this.saveSuccess = true;
        }).catch((errObj:any)=>{
            if(errObj.statusText == 'Bad Request'){                
                var body = JSON.parse(errObj._body);
                this.userMsgs = [];
                this.userMsgs.push({
                        severity: 'error',
                        summary: 'Invalid',
                        detail: body.Data.Errors[0].Description
                });
            } else{
                this.applog.dataError(errObj);
            } 
        });
    }

    addAlert(){
        var newAlert:any = {};
        newAlert.Message = "";
        this.updatedDetails.AddedAlerts.push(newAlert);

    }

    getUsername(){
        return sessionStorage.getItem("username");
    }

    getDate(){
        return new Date();
    }

    removeSpecification(index){
        this.updatedDetails.AddedAlerts.splice(index, 1);
    }

    cancel(){
        this.containerDetails = JSON.parse(JSON.stringify(this.containerDetailsBackup));
        this.editEnabled = false;
        this.updatedDetails = {};
        this.updatedDetails.AddedAlerts = [];
        this.userMsgs = [];  
    }

    closeDialog(){
        this.saveSuccess = false;      
        this.goBack();
    }
}
