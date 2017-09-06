import { Component, OnInit } from '@angular/core';
import { PregateService } from '../pregate.service';

import { Applog } from '../../applog';
import { CommonService } from '../../shared/common.service';
import { SelectItem, Message } from 'primeng/primeng';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'pregate-detail',
  templateUrl: './pregate-detail.component.html',
  styleUrls: ['./pregate-detail.component.css'],
  providers: [ PregateService ]
})
export class PregateDetailComponent implements OnInit {

    
    //@Input() isDetail;

    private preGateId;
    private preGateDetails= <any>Object;
    private preGateDetailsBackup={};
    private editEnabled:boolean = false;
    private updatedPregate:any;
    private customerList : SelectItem[];
    private selectedCustomerName:string;
    private saveSuccess:boolean = false;
    private userMsgs: Message[];
    private confirmDelete:boolean = false;
    private deleteSuccess:boolean = false;

    constructor(private pregateService:PregateService, private applog:Applog, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.customerList = CommonService.getCustomerList();

        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            this.preGateId = id;          
        });

        this.getDetail();
    }

    getDetail(){
        
        this.pregateService.viewPregateDetail(this.preGateId).then(res => {
            this.preGateDetails = res.json().Data; 

            for(let cust of CommonService.referenceData[0].Data){
                if(cust.Id == this.preGateDetails.CustomerId){
                    this.preGateDetails.CustomerCode = cust.Code;
                    this.preGateDetails.CustomerName = cust.Name;
                }
            }
                  
            this.preGateDetailsBackup = JSON.parse(JSON.stringify(this.preGateDetails));

        }).catch((errObj:any)=>{
            this.applog.dataError(errObj);
        });
    }

    goBack(){
        this.router.navigate(['./pregate']);
        /*if(this.ernDetails.ERNStatus == 'OPEN'){
            this.router.navigate(['./searchern/open']);
        } else{
            this.router.navigate(['./searchern/history']);
        } */  
    }

    editPregate(){
        this.editEnabled = true;

        var temp:any = {};
        temp.ContainerNumber = this.preGateDetails.ContainerNumber;
        temp.ContainerNumberTo = this.preGateDetails.ContainerNumberTo;
        temp.CustomerId = this.preGateDetails.CustomerId;
        temp.StartDate = this.preGateDetails.StartDate;
        temp.EndDate = this.preGateDetails.EndDate;
        temp.ApplyHold = this.preGateDetails.ApplyHold;
        temp.Comments = this.preGateDetails.Comments;

        this.updatedPregate = temp;

        this.populateSelectedCustomer();
    }

    savePregate(){

        this.pregateService.updatePregateDetails(this.updatedPregate, this.preGateDetails.Id).then( res =>{
            this.saveSuccess = true;
            this.editEnabled = false;
        }).catch((errObj:any)=>{
            if(errObj.statusText == 'Bad Request'){
                
                var body = JSON.parse(errObj._body);

                this.userMsgs = [];
                    this.userMsgs.push({
                            severity: 'error',
                            summary: 'Invalid Form',
                            detail: body.Data.Errors[0].Description
                    });
            } else{
                this.applog.dataError(errObj);
            } 
        });        
    }

    cancel(){
        this.editEnabled = false;
        this.preGateDetails = JSON.parse(JSON.stringify(this.preGateDetailsBackup));
        this.updatedPregate = {};
    }

    populateSelectedCustomer(){

        for(let customer of CommonService.referenceData[0].Data){
            if(customer.Id == this.updatedPregate.CustomerId){
                this.selectedCustomerName = customer.Name;
            }
        }
    }

    closeDialog(){
        this.saveSuccess = false;  
        this.deleteSuccess = false;   
        this.goBack();
    }

    delete(){
        this.confirmDelete = false;
        this.pregateService.deletePregate(this.preGateDetails.Id).then(res => {
            this.deleteSuccess = true;
        }).catch((errObj:any)=>{this.applog.dataError(errObj);});
    }

}
