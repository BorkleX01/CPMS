import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RedirectionService } from '../redirection.service';
import { Applog } from '../../applog';
import { Message, SelectItem } from 'primeng/primeng';


@Component({
  selector: 'app-redirection-detail',
  templateUrl: './redirection-detail.component.html',
  styleUrls: ['./redirection-detail.component.css'],
  providers: [RedirectionService]
})
export class RedirectionDetailComponent implements OnInit {

    constructor(private route: ActivatedRoute, private router: Router, private applog: Applog, private redirectionService:RedirectionService) { }

    private redirectionId;
    private redirectionDetails =  <any>Object;

    private redirectionDetailsBackup = {};
    private editEnabled:boolean = false;
    private deleteConfirm:boolean = false;
    private deleteSuccess:boolean = false;
    private saveSuccess:boolean = false;
    private redirectionType:SelectItem[];
    private updatedRedirection: any;
    private isMultiple:boolean = false;
    private duplicateId:string;


    ngOnInit() {

        var sub = this.route.params.subscribe(params => {
            this.redirectionId = params['id'];

            this.redirectionService.viewRedirectionDetail(this.redirectionId).then(res => {
                this.redirectionDetails = res.json().Data; 
                this.redirectionDetailsBackup = JSON.parse(JSON.stringify(this.redirectionDetails));
                this.editEnabled = false;
            });
        });

        this.redirectionType = [];
        this.redirectionType.push({label: 'Single Container', value: 'SingleContainer'});
        this.redirectionType.push({label: 'Bulk Time Based', value: 'BulkTimeBased' });
    }

    goBack() {
        this.router.navigate(['./redirection/active']);

        //once we find how to differentiate between active and inactive redirections, update the condtions below accordingly.
        /*if(this.ernDetails.ERNStatus == 'OPEN'){
            this.router.navigate(['./searchERN/open']);
        } else{
            this.router.navigate(['./searchERN/history']);
        } */       
    }

    editRedirection() {
        this.editEnabled = true;
        var temp:any = {};
        temp.ContainerNumber = this.redirectionDetails.ContainerNumber;
        temp.ContainerISOCode = this.redirectionDetails.ContainerISOCode;
        temp.StartDate = this.redirectionDetails.StartDate;
        temp.EndDate = this.redirectionDetails.EndDate;
        temp.Comments = this.redirectionDetails.Comments;
        temp.RedirectionType = this.redirectionDetails.RedirectionType;

        this.updatedRedirection = temp;

    }

    saveRedirection() {
        this.redirectionService.saveRedirection(this.updatedRedirection, this.redirectionDetails.Id).then( res =>{
            this.saveSuccess = true;
        }).catch((errObj:any)=>{
            if(errObj.statusText == 'Bad Request'){
                
                var body = JSON.parse(errObj._body);
                //this.invalidMessage = body.Data.Errors;

                /*this.userMsgs = [];
                    this.userMsgs.push({
                            severity: 'error',
                            summary: 'Invalid Form',
                            detail: body.Data.Errors[0].Description
                    });*/
                
                if(body.Data.Errors[0].Description.indexOf('Duplicate') != -1){
                    this.isMultiple = true;
                    this.duplicateId = body.Data.Errors[0]["DuplicatedRecord"].Id;
                    console.log("Duplicate id :",this.duplicateId);
                }
            } else{
                this.applog.dataError(errObj);
            } 
        });        
    }

    cancel() {
        this.editEnabled = false;
        this.redirectionDetails = JSON.parse(JSON.stringify(this.redirectionDetailsBackup));
        this.updatedRedirection = {};
    }

    deleteRedirection() {
        this.deleteConfirm = false;
        this.redirectionService.deleteRedirection(this.redirectionDetails.Id).then(res => {
            this.deleteSuccess = true;
        }).catch((errObj:any)=>{
            this.applog.dataError(errObj);
        });
    }

    closeDialog() {
        this.saveSuccess = false;
        this.deleteSuccess = false;        
        this.goBack();
    }

    redirectToDetail(){
        
        let link = ['/redirectiondetail', this.duplicateId.toString()];  
        this.router.navigate(link);
        this.isMultiple = false;
    }

}
