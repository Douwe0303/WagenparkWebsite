import { Component, EventEmitter, Output } from '@angular/core';
import { Order } from "../../../interface/model/order";
import { OrderTransformer } from "../../../class/transformer/order-transformer/order-transformer";
import { Leasecar } from "../../../interface/model/leasecar";

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
  providers: [OrderTransformer]
})
export class AddOrderComponent {

  @Output() newOrderEvent = new EventEmitter<{order: Order, leasecar: Leasecar}>();
}
