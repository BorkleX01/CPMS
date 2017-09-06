import { Injectable } from '@angular/core';
import { CanActivate, Router }    from '@angular/router';

@Injectable()
export class AppAuthService implements CanActivate {

	constructor(private router: Router) { }

	canActivate() {
	    if(sessionStorage.getItem("token") != null && sessionStorage.getItem("token") != undefined){
	    	return true;
	    }else{
	    	this.router.navigate(['/login']);
	    	return false;
	    }    	
	}
}
