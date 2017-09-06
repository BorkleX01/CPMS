import { Headers , RequestOptions} from '@angular/http';

export class RequestHeader {
    authToken:string = '';
    public options:RequestOptions;
    
    constructor (authToken:string){
	this.authToken = authToken;
	this.options = new RequestOptions();
	this.options.headers = this.reqHeaders()
    }
    public reqHeaders(): Headers {
	var headers:Headers = new Headers();
	headers.append('Username', 'whiplash');
	headers.append('Authorization', this.authToken);
	headers.append('CustomerCode', 'CPMS');
	headers.append('Content-Type', 'application/json');
	headers.append('Space-Id', 'MCS');
	//headers.append('Content-Encoding', 'gzip');
	return headers
    }
}
/*
Username:whiplash
Auth-Key:3E277D83-9B16-0216-E053-3CC9C80A0C09
CustomerCode:CPMS
Content-Type:application/json
Space-Id:MCS
*/
