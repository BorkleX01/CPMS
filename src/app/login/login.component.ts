import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Headers, RequestOptions, Http, Response} from '@angular/http';

import { TokenRequest } from '../shared/token-request';
import { Applog } from '../applog';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	private username:string;
	private password:string;

	private isInvalidUsername:boolean = false;
	private isInvalidPassword:boolean = false;
	private isInvalidCredentials:boolean = false;

	authToken:string;

  	constructor(private router: Router, private http: Http, private applog: Applog) { 
		}

  	ngOnInit() {
  		this.username = undefined;
		this.password = undefined;
  	}

    login(){
        console.log("login");
        sessionStorage.setItem('username', this.username);
	sessionStorage.setItem('password', this.password);
	this.router.navigate(['./home']);
        console.log("route to home");
        /*
		this.isInvalidUsername = false;
		this.isInvalidPassword = false;
		this.isInvalidCredentials = false;

		if(!this.username || this.username.length == 0){
			this.isInvalidUsername = true;
		}

		if(!this.password || this.password.length == 0){
			this.isInvalidPassword = true;
		}

		
		if(!this.isInvalidUsername && !this.isInvalidPassword){
			this.getToken(this.username,this.password).then(res=>{

				this.extractToken(res);
				sessionStorage.setItem('token', TokenRequest.authToken);

				if(TokenRequest.authToken.indexOf('undefined') === -1){
					sessionStorage.setItem('username', this.username);
					sessionStorage.setItem('password', this.password);
					this.router.navigate(['./home']);
				}else{
					this.isInvalidCredentials = true;
					this.username = undefined;
					this.password = undefined;
				}
			});
		}*/
	}


	public getToken(username:string, password:string): Promise<any> {
	
		var tokenObj = new TokenRequest(username, password);
		return Promise.resolve(this.http.post(tokenObj.reqURL, tokenObj.reqBody, tokenObj.options).toPromise());
    }

    extractToken(res: Response) {
		let body = res.json();
		TokenRequest.authToken =  'Bearer ' + JSON.parse(body.raw)["access_token"];
    }

    public getAuthToken(){
    	return this.authToken;
    }
}
