import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from "../../../interface/model/order";
import { OrderTransformer } from "../../../transformer/order-transformer/order-transformer";
import { Leasecar } from "../../../interface/model/leasecar";
import { OrderDummy } from "../../../dummy/order-dummy/order-dummy";

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
  providers: [OrderTransformer]
})
export class AddOrderComponent {

  @Output() newOrderEvent = new EventEmitter<{order: Order, leasecar: Leasecar}>();

  @Input() order: Order = new OrderDummy();

  @Input() formName: string = "";

  @Input() edit: boolean = false;
  @Input() buttonName: string = "";
  @Input() buttonFont: string = "";
  @Input() buttonColorClass: string = "";

  @Input() id: string | null = "";
}
