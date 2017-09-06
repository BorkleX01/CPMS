import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { KeysAndValuesPipe } from './shared/keys-and-values.pipe';
import { AppAuthService } from './shared/app-auth.service';
import { AppRoutes } from './app.routes';
import { Applog } from './applog';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppContainerComponent } from './app-container/app-container.component';
import { PendingBookingsComponent } from './booking/pending-bookings/pending-bookings.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchERNComponent } from './ern/search-ern/search-ern.component';
import { CreateERNComponent } from './ern/create-ern/create-ern.component';
import { ERNDetailComponent } from './ern/ern-detail/ern-detail.component';
import { SearchInventoryComponent } from './inventory/search-inventory/search-inventory.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { BookingDetailComponent } from './booking/booking-detail/booking-detail.component';
import { InventoryDetailComponent } from './inventory/inventory-detail/inventory-detail.component'; 
import { SearchRedirectionComponent } from './redirection/search-redirection/search-redirection.component';
import { RedirectionDetailComponent } from './redirection/redirection-detail/redirection-detail.component';
import { CreateRedirectionComponent } from './redirection/create-redirection/create-redirection.component';

import { InputTextModule, DataTableModule, ButtonModule, DialogModule, AccordionModule} from 'primeng/primeng';
import { TabViewModule } from 'primeng/primeng';
import { PanelMenuModule, MenuModule, MenuItem, SplitButtonModule, OverlayPanelModule, ContextMenuModule, MultiSelectModule, MegaMenuModule} from 'primeng/primeng';
import { AutoCompleteModule, DropdownModule, SelectButtonModule, InputSwitchModule, MessagesModule, CalendarModule, GrowlModule } from 'primeng/primeng';
import { InputTextareaModule, CheckboxModule , ChartModule} from 'primeng/primeng';
import { SearchPregateComponent } from './pregate/search-pregate/search-pregate.component';
import { PregateDetailComponent } from './pregate/pregate-detail/pregate-detail.component';
import { CreatePregateComponent } from './pregate/create-pregate/create-pregate.component';



@NgModule({
  declarations: [
      AppComponent,
      LoginComponent,
      DashboardComponent,
      AppContainerComponent,
      PendingBookingsComponent,
      HeaderComponent,
      FooterComponent,
      SearchERNComponent,
      ERNDetailComponent,
      CreateERNComponent,
      KeysAndValuesPipe,
      SearchInventoryComponent,
      ErrorpageComponent,
      SearchRedirectionComponent,
      RedirectionDetailComponent,
      CreateRedirectionComponent,
      BookingDetailComponent,
      InventoryDetailComponent,
      SearchPregateComponent,
      PregateDetailComponent,
      CreatePregateComponent
  ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      InputTextModule,
      DataTableModule,
      ButtonModule,
      DialogModule,
      AccordionModule,
      RouterModule,
      RouterModule.forRoot(AppRoutes),
      PanelMenuModule,
      SplitButtonModule,
      MenuModule,
      OverlayPanelModule,
      ContextMenuModule,
      MultiSelectModule,
      TabViewModule,
      MegaMenuModule,
      AutoCompleteModule,
      DropdownModule,
      SelectButtonModule,
      InputSwitchModule,
      MessagesModule,
      GrowlModule,
      CalendarModule,
      GrowlModule,
      CalendarModule,
      InputTextareaModule,
      CheckboxModule,
      ChartModule
  ],

  providers: [Applog, AppAuthService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
