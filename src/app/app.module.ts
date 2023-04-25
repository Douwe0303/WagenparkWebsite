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
import { EditOrderComponent } from './component/order-component/edit-order/edit-order.component';
import { ToastComponent } from './component/toast/toast.component';
import { ViewOrderComponent } from './component/order-component/view-order/view-order.component';
import { PagenotfoundComponent } from './component/page/notfound-page/pagenotfound.component';
import { DataViewComponent } from './component/data-view/data-view.component';
import { OffCanvasComponent } from './component/off-canvas/off-canvas.component';
import { BreadcrumbComponent } from './component/breadcrumb/breadcrumb.component';
import { AccordionComponent } from './component/accordion/accordion.component';
import { TableComponent } from './component/table-component/table/table.component';
import { TableHeadComponent } from './component/table-component/table-head/table-head.component';
import { TableBodyComponent } from './component/table-component/table-body/table-body.component';
import { TableRowComponent } from './component/table-component/table-row/table-row.component';
import { TableDataComponent } from './component/table-component/table-data/table-data.component';
import { ActionsComponent } from './component/table-component/table-data-items/actions/actions.component';
import { TextNoWrapComponent } from './component/table-component/table-data-items/text-no-wrap/text-no-wrap.component';
import { RotateArrowComponent } from './component/table-component/table-data-items/rotate-arrow/rotate-arrow.component';
import { TableDataDirective } from './directive/table-data.directive';
import { DynamicModule } from "ng-dynamic-component";
import { LicensePlateComponent } from './component/table-component/table-data-items/license-plate/license-plate.component';
import { EventService } from "./service/event/event.service";
import { LeasecarFormComponent } from './component/leasecar-form/leasecar-form.component';
import { AlphabeticalPipe } from './pipe/alphabetical/alphabetical.pipe';
import { NgOptimizedImage } from "@angular/common";
import { ActionPageComponent } from './component/page/action-page/action-page.component';
import { LeasecarViewComponent } from './component/leasecar-view/leasecar-view.component';
import { OrderFormComponent } from './component/order-form/order-form.component';
import { OrderViewComponent } from './component/order-view/order-view.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    DashboardComponent,
    NavbarComponent,
    LeasecarsComponent,
    AddOrderComponent,
    DataToolsComponent,
    EditOrderComponent,
    ToastComponent,
    ViewOrderComponent,
    PagenotfoundComponent,
    DataViewComponent,
    OffCanvasComponent,
    BreadcrumbComponent,
    AccordionComponent,
    TableComponent,
    TableHeadComponent,
    TableBodyComponent,
    TableRowComponent,
    TableDataComponent,
    ActionsComponent,
    TextNoWrapComponent,
    RotateArrowComponent,
    TableDataDirective,
    LicensePlateComponent,
    LeasecarFormComponent,
    AlphabeticalPipe,
    ActionPageComponent,
    LeasecarViewComponent,
    OrderFormComponent,
    OrderViewComponent,
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
    ReactiveFormsModule,
    DynamicModule,
    NgOptimizedImage
  ],
  bootstrap: [AppComponent],
  providers: [EventService]
})
export class AppModule { }
