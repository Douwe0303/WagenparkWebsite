import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { OrdersComponent } from "./component/page/orders-page/orders.component";
import { DashboardComponent } from "./component/page/dashboard-page/dashboard.component";
import { LeasecarsComponent } from "./component/page/leasecars-page/leasecars.component";
import { PagenotfoundComponent } from "./component/page/notfound-page/pagenotfound.component";
import { ActionPageComponent } from "./component/page/action-page/action-page.component";

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
    path: 'leasecars',
    component: LeasecarsComponent,
  },
  {
    path: ':title/:id/:action',
    component: ActionPageComponent,
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
