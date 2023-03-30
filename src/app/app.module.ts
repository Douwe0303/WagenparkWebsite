import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbDropdown, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrdersComponent } from './component/page/orders-page/orders.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterOutlet } from "@angular/router";
import { DashboardComponent } from './component/page/dashboard-page/dashboard.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { LeasecarsComponent } from './component/page/leasecars-page/leasecars.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from "@angular/material/icon";
import { HttpClientModule } from "@angular/common/http";
import { AddOrderComponent } from './component/order-component/add-order/add-order.component';
import { DataToolsComponent } from './component/data-tools/data-tools.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OrderSortPipe } from './pipe/sort/order/order-sort.pipe';
import { OrderFilterPipe } from './pipe/filter/order/order-filter.pipe';
import { EditOrderComponent } from './component/order-component/edit-order/edit-order.component';
import { ToastOrderComponent } from './component/order-component/toast-order/toast-order.component';
import { ViewOrderComponent } from './component/order-component/view-order/view-order.component';
import { PagenotfoundComponent } from './component/page/notfound-page/pagenotfound.component';
import { DataViewComponent } from './component/data-view/data-view.component';
import { OffCanvasComponent } from './component/off-canvas/off-canvas.component';
@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    DashboardComponent,
    NavbarComponent,
    LeasecarsComponent,
    AddOrderComponent,
    DataToolsComponent,
    OrderSortPipe,
    OrderFilterPipe,
    EditOrderComponent,
    ToastOrderComponent,
    ViewOrderComponent,
    PagenotfoundComponent,
    DataViewComponent,
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
