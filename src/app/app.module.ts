import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {NgbDropdown, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { OrdersComponent } from './component/order-component/orders/orders.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterOutlet } from "@angular/router";
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { LeasecarsComponent } from './component/leasecars/leasecars.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from "@angular/material/icon";
import { HttpClientModule } from "@angular/common/http";
import { AddOrderComponent } from './component/order-component/add-order/add-order.component';
import { OrderCollapseDataComponent } from "./component/order-component/order-collapse-data/order-collapse-data.component";
import { DataToolsComponent } from './component/data-tools/data-tools.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { OrderSortPipe } from './pipe/order-sort.pipe';
import { OrderFilterPipe } from './pipe/order-filter.pipe';
import { EditOrderComponent } from './component/order-component/edit-order/edit-order.component';
import { ToastOrderComponent } from './component/order-component/toast-order/toast-order.component';
import { ViewOrderComponent } from './component/order-component/view-order/view-order.component';
import { PagenotfoundComponent } from './component/pagenotfound/pagenotfound.component';
import { OrderDataComponent } from './component/order-component/order-data/order-data.component';
import { PersonalDataComponent } from './component/personal-data/personal-data.component';
import { ContractDataComponent } from './component/contract-data/contract-data.component';
import { CarDataComponent } from './component/car-data/car-data.component';
import { OffCanvasComponent } from './component/off-canvas/off-canvas.component';
@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    DashboardComponent,
    NavbarComponent,
    LeasecarsComponent,
    AddOrderComponent,
    OrderCollapseDataComponent,
    DataToolsComponent,
    OrderSortPipe,
    OrderFilterPipe,
    EditOrderComponent,
    ToastOrderComponent,
    ViewOrderComponent,
    PagenotfoundComponent,
    OrderDataComponent,
    PersonalDataComponent,
    ContractDataComponent,
    CarDataComponent,
    OffCanvasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    NgbModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    NgbDropdown,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
