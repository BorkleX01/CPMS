import { Headers } from '@angular/http';
import { User } from './user';

export class TokenRequest {

	constructor(username:string, password:string){
		var user = new User();
		user.ClientId = "1STOP";
		user.Username = username;
		user.Password = password;

		this.reqBody = user;
	}

    public reqURL = TokenRequest.apiBaseUrl + 'AuthProxy/v1/Token';
    public options:Headers = this.reqHeaders();

    public static authToken;
    public reqBody;
    public static apiBaseUrl;

    public reqHeaders(): Headers {
		var headers:Headers = new Headers();
		headers.append('Content-Type', 'application/json');
	
		return headers;	
    }

    public getAuthToken(){
    	return TokenRequest.authToken;
    }
}


