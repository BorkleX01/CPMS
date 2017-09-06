import { Component } from '@angular/core';
import { TokenRequest } from './shared/token-request';
import { CommonService } from './shared/common.service';

import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor(){
		var token = sessionStorage.getItem("token");

		if(token != null && token.indexOf("undefined") == -1){
			TokenRequest.authToken = token;		
		}
		console.log("Environment: "+environment.name);
		TokenRequest.apiBaseUrl = environment.apiBaseUrl;
		CommonService.hasReferenceData = false;

		
	}
}
