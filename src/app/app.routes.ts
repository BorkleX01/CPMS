import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PendingBookingsComponent } from './booking/pending-bookings/pending-bookings.component';
import { AppContainerComponent } from './app-container/app-container.component';

import { SearchERNComponent } from './ern/search-ern/search-ern.component';
import { CreateERNComponent } from './ern/create-ern/create-ern.component';
import { ERNDetailComponent } from './ern/ern-detail/ern-detail.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { SearchInventoryComponent } from './inventory/search-inventory/search-inventory.component';
import { SearchRedirectionComponent } from './redirection/search-redirection/search-redirection.component';
import { RedirectionDetailComponent } from './redirection/redirection-detail/redirection-detail.component';
import { CreateRedirectionComponent } from './redirection/create-redirection/create-redirection.component';
import { AppAuthService } from './shared/app-auth.service';
import { BookingDetailComponent } from './booking/booking-detail/booking-detail.component';
import { InventoryDetailComponent } from './inventory/inventory-detail/inventory-detail.component';
import { SearchPregateComponent } from './pregate/search-pregate/search-pregate.component';
import { CreatePregateComponent } from './pregate/create-pregate/create-pregate.component';
import { PregateDetailComponent } from './pregate/pregate-detail/pregate-detail.component';


export const AppRoutes = [

    {
        path: 'login',
        component: LoginComponent,
        name: 'Login'
    }, {
        path: 'home',
        component: AppContainerComponent,
        children: [{
            path: '',
            component: DashboardComponent
        }],
        //canActivate: [AppAuthService]
    }, {
        path: 'pendingbookings',
        component: AppContainerComponent,
        children: [{
            path: '',
            component: PendingBookingsComponent
        }],
        //canActivate: [AppAuthService]

    },
    {
        path: 'searchern',
        component: AppContainerComponent,
        children: [
            { 
                path: 'open', 
                component: SearchERNComponent,
                data: [{isHistory: false}]
            },{ 
                path: 'history', 
                component: SearchERNComponent,
                data: [{isHistory: true}]
            }
        ],
        canActivate: [AppAuthService]
    },{
        path: 'createern',
        component: AppContainerComponent,
        children: [
            { 
                path: '', 
                component: CreateERNComponent
            }
        ],
        //canActivate: [AppAuthService]
    },{
        path:'erndetail/:id',
        component: AppContainerComponent,
        children: [
            {
                path: '', 
                component: ERNDetailComponent 
  
            }
        ],
        //canActivate: [AppAuthService]
    },{
        path:'errorpage',
        component: AppContainerComponent,
        children: [
            {
                path: '', 
                component: ErrorpageComponent
  
            }
        ],
        //canActivate: [AppAuthService]
    },{
        path:'inventory',
        component: AppContainerComponent,
        children: [
            {
                path: '', 
                component: SearchInventoryComponent
  
            }
        ],
        //canActivate: [AppAuthService]
    },{
        path:'inventorydetail/:id',
        component: AppContainerComponent,
        children: [
            {
                path: '', 
                component: InventoryDetailComponent 
  
            }
        ],
        //canActivate: [AppAuthService]
    },{
        path:'redirection',
        component: AppContainerComponent,
        children: [
            {
                path: 'active', 
                component: SearchRedirectionComponent,
                data:[{isActive:true}]
  
            },{
                path: 'inactive', 
                component: SearchRedirectionComponent,
                data:[{isActive:false}]
  
            }
        ],
        //canActivate: [AppAuthService]
    },{
        path:'redirectiondetail/:id',
        component: AppContainerComponent,
        children: [
            {
                path: '', 
                component: RedirectionDetailComponent 
  
            }
        ],
        //canActivate: [AppAuthService]
    },{
        path:'createredirection',
        component: AppContainerComponent,
        children: [
            {
                path: '', 
                component: CreateRedirectionComponent 
  
            }
        ],
        //canActivate: [AppAuthService]
    },{
        path:'bookingdetail/:id',
        component: AppContainerComponent,
        children: [
            {
                path: '', 
                component: BookingDetailComponent 
  
            }
        ],
        //canActivate: [AppAuthService]
    },{
        path:'pregate',
        component: AppContainerComponent,
        children: [
            {
                path: '', 
                component: SearchPregateComponent 
  
            }
        ],
        //canActivate: [AppAuthService]
    },{
        path:'pregatedetail/:id',
        component: AppContainerComponent,
        children: [
            {
                path: '', 
                component: PregateDetailComponent 
  
            }
        ],
        //canActivate: [AppAuthService]
    },{
        path:'createpregate',
        component: AppContainerComponent,
        children: [
            {
                path: '', 
                component: CreatePregateComponent 
  
            }
        ],
        //canActivate: [AppAuthService]
    },{
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    
];
