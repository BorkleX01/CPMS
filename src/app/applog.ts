import { Injectable, Input } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class Applog {
    constructor(private router:Router){}
    public errorLog:any = "Application Log Default Error";
    public stdLog:any = "Yes... something happenned";
    public showErrorModal:boolean = false;
    public showNotification:boolean = false;
    public allowDismissal = true;

    public getStandardLog()
    {
	return this.stdLog;
    }
    public writeStandardLog(msg:string)
    {
	this.stdLog = msg;
    }
    
    public getErrorLog(){
	return this.errorLog
    }
    public writeError(errMessage:string){
	this.errorLog = errMessage;
    }

    public dataError(errObj:any){
	console.log(errObj);
	this.writeError(errObj);
	//this.router.navigate(['./errorpage']);
	this.showErrorModal = true;
    }

    public simpleMessage(msg:any){
	console.log(msg);
	this.writeStandardLog(msg);
	//this.router.navigate(['./errorpage']);
	this.showNotification = true;
    }
    public closeNotification(){
	this.showNotification = false;
    }

    public showProgress(){
	this.stdLog = "Loading";
	this.allowDismissal = false;
	this.showNotification = true;
    }
    
}
