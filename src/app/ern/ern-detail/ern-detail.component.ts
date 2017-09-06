import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ERNService } from '../ern.service';
import { ERNSpecification } from '../data-models/ernspecification';
import { ERN } from '../data-models/ern';
import { ReleaseDetail } from '../data-models/release-detail';
import { Applog } from '../../applog';
import { Http, Response } from '@angular/http';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'ern-detail',
  templateUrl: './ern-detail.component.html',
  styleUrls: ['./ern-detail.component.css'],
  providers: [ERNService],
  encapsulation: ViewEncapsulation.None
})
export class ERNDetailComponent implements OnInit {

    constructor(private route: ActivatedRoute, private ernService:ERNService,private router: Router, private applog: Applog, private http: Http) { }

    private ernNumber;
    private ernDetails =  <any>Object;
    private ernDetailsBackup = {};
    private editEnabled:boolean = false;
    private updatedERN = new ERN();
    private newReleaseList = new Array<ReleaseDetail>();
    private saveSuccess:boolean = false;
    private closeConfirm:boolean = false;
    private closeSuccess:boolean = false;
    private isAdd:boolean = false;
    private userMsgs: Message[] = [];
    private releaseMsgs: Message[] = [];

    

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            this.ernNumber = id;
          
        });

        this.ernService.viewERNDetail(this.ernNumber).then(res => {
            this.ernDetails = res.json().Data; 
            this.ernDetailsBackup = JSON.parse(JSON.stringify(this.ernDetails));
            this.releaseMsgs = [];
            if (this.ernDetails.ReleasedContainerList.length == 0) {
                this.releaseMsgs.push({
                    severity: 'warn',
                    summary: 'No Data',
                    detail: 'No containers have been released.'
                });
            }
        }).catch((errObj:any)=>{
            this.applog.dataError(errObj);
        });
    }

    editERN(){
        this.editEnabled = true;
    }

    cancel(){
        this.editEnabled = false;
        this.ernDetails = JSON.parse(JSON.stringify(this.ernDetailsBackup));
        this.newReleaseList = new Array<ReleaseDetail>();
    }

    addSpecification(){
        var release = new ReleaseDetail();
        this.newReleaseList.push(release);
    }

    goBack() {
        if(this.ernDetails.ERNStatus == 'OPEN'){
            this.router.navigate(['./searchern/open']);
        } else{
            this.router.navigate(['./searchern/history']);
        }        
    }

    saveERN(){

        this.userMsgs = [];
        this.updatedERN.ReleaseNo = this.ernDetails.ReleaseNumber;
        this.updatedERN.CustomerCode = this.ernDetails.CustomerCode;
        this.updatedERN.comments = this.ernDetails.Comments;
        var specList = new Array<ERNSpecification>();

        for (let iso of this.ernDetails.IsoList) {
            var spec = new ERNSpecification();
            spec.Iso = iso.IsoCode;
            if(iso.QuantityOrdered >=  iso.QuantityReleased){
                spec.Quantity = iso.QuantityOrdered;
            }else{
                this.userMsgs.push({
                        severity: 'error',
                        summary: 'Invalid',
                        detail: 'Quantity Ordered cannot be less than quantity released.'
                });
                return;
            }
            
            /*spec.comments = iso.Remarks;*/

            specList.push(spec);
        }

        for( let release of this.newReleaseList){
            var spec = new ERNSpecification();
            spec.Iso = release.IsoCode;
            spec.Quantity = release.QuantityOrdered;
            /*spec.comments = release.Remarks;*/

            specList.push(spec);
        }

        this.updatedERN.ErnSpecifications = specList;

        //call service and save
        //set this.saveSuccess to true on success

        this.ernService.saveERN(this.updatedERN).then(res => {
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

    removeSpecification(index:number){
        this.newReleaseList.splice(index, 1);
        if(this.newReleaseList.length == 0){
            this.isAdd = false;
        }
    }

    closeDialog(){
        this.saveSuccess = false;
        this.closeSuccess = false;        
        this.goBack();
    }

    closeERN(){
        this.closeConfirm = false;
        this.ernService.closeERN(this.ernDetails.ReleaseNumber).then(res => {
            this.closeSuccess = true;
        }).catch((errObj:any)=>{this.applog.dataError(errObj);});
    }

    confirmClose(){
        this.closeConfirm = true;
    }

    reopenERN(){
      //logic to re-open ERN
    }
}
