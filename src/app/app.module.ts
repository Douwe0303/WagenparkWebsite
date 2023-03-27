import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrdersComponent } from './component/orders/orders.component';
import { OrderComponent } from './component/order/order.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterOutlet } from "@angular/router";
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { LeasecarsComponent } from './component/leasecars/leasecars.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from "@angular/material/icon";
import { HttpClientModule } from "@angular/common/http";
import { AddOrderComponent } from './component/add-order/add-order.component';
import { OrderCollapseDataComponent } from "./component/order-collapse-data/order-collapse-data.component";
import { DataToolsComponent } from './component/data-tools/data-tools.component';
import { FormsModule } from "@angular/forms";
import { OrderSortPipe } from './pipe/order-sort.pipe';
import { OrderFilterPipe } from './pipe/order-filter.pipe';
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
