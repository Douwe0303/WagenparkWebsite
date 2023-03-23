import { Component, Input } from '@angular/core';
import { Order } from "../../interface/order";
import { DummyOrder } from "../../class/dummy-order";

@Component({
  selector: 'app-order-collapse-data',
  templateUrl: './order-collapse-data.component.html',
  styleUrls: ['./order-collapse-data.component.css']
})
export class OrderCollapseDataComponent {
  @Input() order: Order = new DummyOrder();
  @Input() orderStatus: string = "";
}
