import { Component, OnInit , AfterViewInit, ElementRef} from '@angular/core';
import { Response, Http } from '@angular/http';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

import { MenuItem } from 'primeng/primeng';
import { environment } from '../../environments/environment';

import { Applog } from '../applog';
import { CommonService } from '../shared/common.service';
import { RequestHeader } from '../shared/request-header';
import { ApiSettings } from '../shared/api-settings';
import { TokenRequest } from '../shared/token-request';


declare var Ultima: any;

@Component({
  selector: 'app-app-container',
  templateUrl: './app-container.component.html',
  styleUrls: ['./app-container.component.css'],
  providers: [Applog]
})

export class AppContainerComponent implements OnInit , AfterViewInit {

	layoutCompact: boolean = true;

    layoutMode: string = 'horizontal';
    
    darkMenu: boolean = true;
    
    profileMode: string = 'inline';

		changeTheme(event, theme) {
        let themeLink: HTMLLinkElement = <HTMLLinkElement> document.getElementById('theme-css');
        let layoutLink: HTMLLinkElement = <HTMLLinkElement> document.getElementById('layout-css');
        
        themeLink.href = 'assets/css/theme-' + theme +'.css';
        layoutLink.href = 'assets/css/layout-' + theme +'.css';
        event.preventDefault();
    }

  	constructor(private applog: Applog, private el: ElementRef, private http:Http) { 
    }
  	private items: MenuItem[];
    private tableHeadings:any = [];
    private showAll:boolean = true;
    private totalCount = 0;
    private columnOptions: any[];
    

	ngAfterViewInit() {
        Ultima.init(this.el.nativeElement);
    }
    
  	ngOnInit() {
		
        if(!CommonService.hasReferenceData){
            this.getReferenceData().then((res) => {
                CommonService.referenceData = res.json().Data;            
                CommonService.hasReferenceData = true;
            });
        }       
  	}

    public extractTableData(res: Response, selectedColumns):any[] {
        let body = res.json();
        if ((body.Data[0] != null) && (body.Data[0] != undefined)){
            if (this.showAll ){
                this.tableHeadings = Object.keys(body.Data[0]);
            }
            this.populateColumnSelector(selectedColumns);
            this.totalCount = body.Data.length;
        }
        
        return body.Data;
        
    }

    public populateColumnSelector(selectedColumns){
        this.columnOptions = [];
        
        for (let i = 0; i < this.tableHeadings.length; i++) {
            if(selectedColumns.indexOf(this.tableHeadings[i]) != -1){
                this.columnOptions.push({
                    label: this.tableHeadings[i],
                    value: this.tableHeadings[i]
                });
            }
        }
    }

    public getTotalCount(){
        return this.totalCount;
    }

    public getColumnOptions(){
        return this.columnOptions;
    }

    getUsername(){
        return sessionStorage.getItem("username");
    }

    getReferenceData(){
        var requestHeader = new RequestHeader(TokenRequest.authToken);

        return Promise.resolve(this.http.get(TokenRequest.apiBaseUrl + ApiSettings.REFERENCE_DATA_URL, {headers: requestHeader.options.headers}).toPromise());
    }

    
		
}
