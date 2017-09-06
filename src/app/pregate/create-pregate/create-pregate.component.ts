import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Pregate } from '../data-models/pregate';
import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/primeng';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonService } from '../../shared/common.service';
import { PregateService } from '../pregate.service';
import { Applog } from '../../applog';


@Component({
  selector: 'app-create-pregate',
  templateUrl: './create-pregate.component.html',
  styleUrls: ['./create-pregate.component.css'],
  providers:[DatePipe, PregateService]

})
export class CreatePregateComponent implements OnInit {

    private newPregate = new Pregate();
    private pregateType:SelectItem[];
    private userMsgs: Message[] = [];
    private pregateTypeMsgs: Message[] = [];
    private customerList : SelectItem[];
    private selectedCustomer = <any>Object;
    private createSuccess:boolean = false;

    constructor(private router:Router, private datePipe: DatePipe, private pregateService:PregateService, private applog:Applog) { }

    ngOnInit() {
        this.pregateType = [];
        this.pregateType.push({label: 'Single Container', value: 'SINGLE'});
        this.pregateType.push({label: 'Bulk Range', value: 'RANGE' });

        this.customerList = CommonService.getCustomerList();
        this.newPregate.StartDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    }

    goBack(){
        this.router.navigate(['./pregate']);
    }

    populateSelectedCustomer(){

        for(let customer of CommonService.referenceData[0].Data){
            if(customer.Id == this.newPregate.CustomerId){
                this.selectedCustomer = customer;
            }
        }
    }

    createPregate(){

        if(this.validatePregateForm()){
            
            this.pregateService.createNewPregate(this.newPregate).then(res => {
                this.createSuccess = true;
            }).catch((errObj:any)=>{
                if(errObj.statusText == 'Bad Request'){
                   
                    var body = JSON.parse(errObj._body);
                    this.userMsgs = [];
                    for(let error of body.Data.Errors){
                        this.userMsgs.push({
                            severity: 'error',
                            summary: 'Invalid Form',
                            detail: error.Name +': '+error.Description
                    });
                    }
                    
                } else{
                    this.applog.dataError(errObj);
                }    
            });
        }

    }

    validatePregateForm(){
        this.userMsgs = [];
        if(!this.newPregate.ContainerNumber || this.newPregate.ContainerNumber.length == 0 ||
            (this.newPregate.PreGateType === 'RANGE' && (!this.newPregate.ContainerNumberTo || this.newPregate.ContainerNumberTo.length == 0))||
            !this.newPregate.CustomerId || this.newPregate.CustomerId.length == 0 ||
            !this.newPregate.EndDate || this.newPregate.EndDate.length == 0
            ){

            this.userMsgs.push({
                severity: 'error',
                summary: 'Invalid Form',
                detail: "All fields are mandatory."
            });
            return false;
        }

        return true;
    }
}
