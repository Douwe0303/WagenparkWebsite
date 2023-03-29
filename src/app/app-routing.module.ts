import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { OrdersComponent } from "./component/order-component/orders/orders.component";
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { LeasecarsComponent } from "./component/leasecars/leasecars.component";
import { PagenotfoundComponent } from "./component/pagenotfound/pagenotfound.component";
import { ViewOrderComponent } from "./component/order-component/view-order/view-order.component";
import { EditOrderComponent } from "./component/order-component/edit-order/edit-order.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'orders/:id/view',
    title: 'Order',
    component: ViewOrderComponent,
  },
  {
    path: 'orders/:id/edit',
    title: 'Order',
    component: EditOrderComponent,
  },
  {
    path: 'leasecars',
    component: LeasecarsComponent,
  },
  { path: '**', pathMatch: 'full',
    component: PagenotfoundComponent },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
