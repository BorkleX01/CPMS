import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { DashboardService } from './dashboard.service';
import { Applog } from '../applog';
import {ChartModule} from 'primeng/primeng';
import { UIChart } from 'primeng/primeng';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [DashboardService]
})
export class DashboardComponent implements OnInit {
  
    pie1Data: any;
    pie1Options: any;
    pieData: any;
    pieOptions: any;
    bookingData: any;
    bookingPieLegend: any = [];
    bookingPieLegendColors: any = ["#FF6384", "#36A2EB", "#FFCE56", "#52bd0f", "#dddf2a"];
    yardData: any;
		yardChartOptions: any;
		bookingQtyVTimeData: any;
		bookingQtyVTimeOptions: any;
		bookingQtyVDaysData: any;
		bookingQtyVDaysOptions: any;

    constructor(private router: Router, private dashboardService:DashboardService, private applog:Applog){ }
    @ViewChild("bookingChart") bookingChart: UIChart;	

		
		

    ngOnInit() {
				this.bookingQtyVTimeData = {
						labels: ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
						datasets: [
								{
										label: 'Arrived',
										backgroundColor: "#000000",
										data: [3, 4, 6, 8, 6, 7, 5, 8, 6, 12, 18, 6, 4, 7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0]
								},
								{
										label: 'Due',
										backgroundColor: "rgba(151,187,205,0.5)",
										data: [0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  3, 4, 5, 7, 9, 12, 8, 9, 8, 12, 3, 5, 5, 5]
								}
								
						]

				};

				this.bookingQtyVTimeOptions = {
            title:{
                display:true,
                text:"Bookings Qty vs Time"
            },
						legend: {
                display: false,
                position: 'bottom'
            },
            tooltips: {
                mode: 'label'
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        };

				this.bookingQtyVDaysData = {
						labels: ['30-Nov','1-Dec','2-Dec'],
						datasets: [
								{
										label: 'Completed',
										backgroundColor: [
												"#FF6384",
                        "#FF6384",
                        "#FF6384",
                        
										],
										//data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
										data: [2000, 2500, 2000]
								}, {
										label: 'Pending',
										backgroundColor: [
												
												"#AAAAAA",
												"#000000",
												"#AAAAAA",
                    ],
										//data: [randomScalingFactor()+randomScalingFactor(), randomScalingFactor()+randomScalingFactor(), randomScalingFactor()+randomScalingFactor(), randomScalingFactor()+randomScalingFactor(), randomScalingFactor()+randomScalingFactor(), randomScalingFactor()+randomScalingFactor(), randomScalingFactor()+randomScalingFactor(), randomScalingFactor()+randomScalingFactor(), randomScalingFactor()+randomScalingFactor(), randomScalingFactor()+randomScalingFactor()]
										data: [100, 0, 0 ]
								}
						]

				};

				this.bookingQtyVDaysOptions = {
            title:{
                display:true,
                text:"Bookings Qty vs Day"
            },
						legend: {
                display: true,
                position: 'bottom'
            },
            tooltips: {
                mode: 'label'
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        };
				
				var randomScalingFactor = function() {
						
            return (Math.random() > 0.5 ? 1.0 : 1.0) * Math.round(Math.random() * 100);
        };
        var randomColorFactor = function() {
            return Math.round(Math.random() * 255);
        };

				this.yardData = {
						labels: ['S/L1','S/L1','S/L2','S/L2'],
						datasets: [
								{
										label: 'Used',
										backgroundColor: [
												"#FF6384",
                        "#ffb1c1",
                        "#36A2EB",
                        "#9ad0f5",
												"#FFFFFF",
												"#FFFFFF",
												"#FFFFFF",
												"#FFFFFF",
                        
										],
										//data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
										data: [40, 55, 63, 77, 64, 0, 0, 0, 0]
								}, {
										label: 'Allocated',
										backgroundColor: [
												
												"#AAAAAA",
												"#000000",
												"#AAAAAA",
												"#000000",
												"#AAAAAA",
												"#000000",
												"#AAAAAA",
												"#000000",
												"#FFFFFF",
												
                    ],
										//data: [randomScalingFactor()+randomScalingFactor(), randomScalingFactor()+randomScalingFactor(), randomScalingFactor()+randomScalingFactor(), randomScalingFactor()+randomScalingFactor(), randomScalingFactor()+randomScalingFactor(), randomScalingFactor()+randomScalingFactor(), randomScalingFactor()+randomScalingFactor(), randomScalingFactor()+randomScalingFactor(), randomScalingFactor()+randomScalingFactor(), randomScalingFactor()+randomScalingFactor()]
										data: [20, 20, 30, 25, 30, 33, 50, 27, 64]
								}
						]

				};

				this.yardChartOptions = {
            title:{
                display:true,
                text:"Yard Availability"
            },
						legend: {
                display: false,
                position: 'bottom'
            },
            tooltips: {
                mode: 'label'
            },
            responsive: true,
            /*scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    stacked: true
                }]
            }*/
        };

		this.transformBookingPieData();
		this.retrieveBookingData();				
				
}

    /*ngAfterViewInit(){
    	let data = this.retrieveBookingData();

            this.transformBookingPieData(data);
    }
*/
    retrieveBookingData(){

    	this.dashboardService.getBookingByShippingLineData(1234).then( (res) => {
           //console.log("res: ",res.json());

            this.bookingData = res.json().Data;
            this.transformBookingPieData();
           // console.log("Before do check: ");
            this.bookingChart.ngDoCheck(); 
        }).catch((errObj:any)=>{
            //this.applog.dataError(errObj);
        });
    		
    }

    transformBookingPieData(){
    	var bookingLabels=[];
    	var bookingDatasets=[];
    	var colors = [
	                        "#FF6384",
	                        "#ffdfe6",
	                        "#36A2EB",
	                        "#d6ecfb",
	                        "#FFCE56",
	                        "#fff5dd",
	                        "#52bd0f",
	                        "#dcf1cf",
	                        "#dddf2a",
	                        "#f8f8d4"
	                    ];
        if(this.bookingData !=undefined){
        	//console.log("Inside if");

        	for(let booking of this.bookingData){
        		//console.log("booking: ", booking);
        		let legend:any = {};
	    		bookingLabels.push(booking.CustomerName + ': DropOff');
	    		bookingLabels.push(booking.CustomerName + ': PickUp');

	    		//console.log("labbel: ",bookingLabels);
	    		bookingDatasets.push(booking.DropOffCount);
	    		bookingDatasets.push(booking.PickUpCount);
	    		this.bookingPieLegend.push(booking.CustomerName);
	    		//console.log("labbel: ",this.bookingPieLegend);
	    	}

	    	//console.log("labels: ",bookingLabels);
	    	//console.log("datasets: ",bookingDatasets);

	    	this.pieData = {
	            labels: bookingLabels,
	            datasets: [
	                {
	                    data: bookingDatasets,
	                    backgroundColor:colors,
	                    hoverBackgroundColor: [
	                        "#FF6384",
	                        "#ffb1c1",
	                        "#36A2EB",
	                        "#9ad0f5",
	                        "#FFCE56",
	                        "#ffe6aa",
	                        "#52bd0f",
	                        "#a8de87",
	                        "#dddf2a",
	                        "#eeef94"
	                    ]
	            }]    
	        };


        } else{
        	this.pieData = {
	            labels: [],
	            datasets: [
	                {
	                    data: [100]
	            }]    
	        };

        }
    	
        
        this.pieOptions = {
            title: {
                display: true,
                text: 'Booking by Shipping Line',
                fontSize: 16
            },
            legend: {
                display: false,
                position: 'bottom'
            }
        };

    }
}
