import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { OrdersComponent } from "./component/page/orders-page/orders.component";
import { DashboardComponent } from "./component/page/dashboard-page/dashboard.component";
import { LeasecarsComponent } from "./component/page/leasecars-page/leasecars.component";
import { PagenotfoundComponent } from "./component/page/notfound-page/pagenotfound.component";
import { ViewOrderComponent } from "./component/order-component/view-order/view-order.component";

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
    path: 'orders/:id/:action',
    title: 'Order',
    component: ViewOrderComponent,
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
