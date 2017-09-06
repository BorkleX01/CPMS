import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { ERN } from '../data-models/ern';
import { ERNSpecification } from '../data-models/ernspecification';

import { ERNService } from '../ern.service';
import { Applog } from '../../applog';

import { Message, SelectItem } from 'primeng/primeng';

import { CommonService } from '../../shared/common.service';

@Component({
    selector: 'create-ern',
    templateUrl: './create-ern.component.html',
    styleUrls: ['./create-ern.component.css'],
    providers: [ERNService]
})
export class CreateERNComponent implements OnInit {

    constructor(private router: Router, private ernService: ERNService, private applog:Applog) {}

    private newErn = new ERN();
    private createSuccess: boolean = false;
    private selectedERNSpec:ERNSpecification;
    private userMsgs: Message[] = [];
    private customerList:SelectItem[] = [];

    ngOnInit() {

        this.addSpecification();
        this.customerList = CommonService.getCustomerList();
        
    }

    addSpecification() {
        var ernSpec = new ERNSpecification();
        this.newErn.ErnSpecifications.push(ernSpec);
    }

    removeSpecification(i: number) {

        
        if (this.newErn.ErnSpecifications.length == 1) {
            this.userMsgs = [];
            this.userMsgs.push({
                severity: 'error',
                summary: 'Invalid Action',
                detail: 'Atleast one ISO details required to create an ERN.'
            });
        } else {
            this.newErn.ErnSpecifications.splice(i, 1);
        }
    }

    goBack() {
        this.router.navigate(['./searchern/open']);
    }

    createERN() {
        if (this.newErn.ReleaseNo.length == 0 ||
            this.newErn.CustomerCode.length == 0) {

            this.userMsgs = [];
            this.userMsgs.push({
                    severity: 'error',
                    summary: 'Invalid Form',
                    detail: 'All fields are mandatory.'
            });
            return;
        }

        for (let spec of this.newErn.ErnSpecifications) {
            if (spec.Iso.length == 0 ||
                spec.Quantity.length == 0 ) {
                    this.userMsgs = [];
                    this.userMsgs.push({
                        severity: 'error',
                        summary: 'Invalid Form',
                        detail: 'All fields are mandatory.'
                    });
                    return;
            }
        }

        
        console.log('new ern: '+JSON.stringify(this.newErn));
       /* if(this.newErn.CustomerCode == 'HSD'){
            this.newErn.CustomerId = '5568760e-c0ac-427d-9c20-e84fb258cf88';
        }else if(this.newErn.CustomerCode == 'MSK'){
            this.newErn.CustomerId = 'e327b757-cdb1-426e-ab3b-ad78afae5595';
        }else if(this.newErn.CustomerCode == 'Sh_code1'){
            this.newErn.CustomerId = '650e6f4e-4b25-43b8-9681-2d020aff35a4';    
        } else if(this.newErn.CustomerCode == 'HAN'){
            this.newErn.CustomerId = '8a9b772f-a5ae-4b08-bdad-5cb901bc4f95';
        } else if(this.newErn.CustomerCode == 'New_Code'){
            this.newErn.CustomerId = 'dc822600-63a4-4a82-addf-45db64e9768a';
        } */

        
            //call service to create ern
            this.ernService.createERN(this.newErn).then(res => {
                this.createSuccess = true;
            }).catch((errObj:any)=>{
                if(errObj.statusText == 'Bad Request'){
                   
                    var body = JSON.parse(errObj._body);
                    //this.invalidMessage = body.Data.Errors;
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

    closeDialog() {
        this.createSuccess = false;
        this.goBack();
    }

    remove(row){
        this.selectedERNSpec = row;
        this.removeSpecification(this.findSelectedRowIndex());
    }

    findSelectedRowIndex(): number {
        return this.newErn.ErnSpecifications.indexOf(this.selectedERNSpec);
    }

    populateCustomerCode(event){
        for(let customer of this.customerList){
            if(event.value == customer.value){
                this.newErn.CustomerCode = customer.label;
            }
        }
    }
}
