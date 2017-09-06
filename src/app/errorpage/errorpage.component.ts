import { Component, OnInit } from '@angular/core';
import { Applog } from '../applog';


@Component({
		selector: 'app-errorpage',
		templateUrl: './errorpage.component.html',
		styleUrls: ['./errorpage.component.css']
})
export class ErrorpageComponent implements OnInit {
	errorObj = "Error log not connected";

	constructor(private applog:Applog) { }
	ngOnInit() { }
		
}
