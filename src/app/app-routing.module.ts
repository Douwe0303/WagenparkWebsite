import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { OrdersComponent } from "./component/orders/orders.component";
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { OrderComponent } from "./component/order/order.component";
import { LeasecarsComponent } from "./component/leasecars/leasecars.component";

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
    path: 'orders/:id',
    title: 'View Order',
    component: OrderComponent
  },
  {
    path: 'leasecars',
    component: LeasecarsComponent,
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
