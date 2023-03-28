import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {NgbDropdown, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { OrdersComponent } from './component/order-component/orders/orders.component';
import { OrderComponent } from './component/order-component/order/order.component';
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
import { FormsModule } from "@angular/forms";
import { OrderSortPipe } from './pipe/order-sort.pipe';
import { OrderFilterPipe } from './pipe/order-filter.pipe';
import { EditOrderComponent } from './component/order-component/edit-order/edit-order.component';
@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    OrderComponent,
    DashboardComponent,
    NavbarComponent,
    LeasecarsComponent,
    AddOrderComponent,
    OrderCollapseDataComponent,
    DataToolsComponent,
    OrderSortPipe,
    OrderFilterPipe,
    EditOrderComponent,
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
    NgbDropdown
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
