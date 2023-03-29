import { Component, OnInit } from '@angular/core';
import { OrderService } from "../../../service/order.service";
import { Order } from "../../../interface/order";
import { DummyOrder } from "../../../class/dummy-order";
import { ActivatedRoute } from "@angular/router";
import { first } from "rxjs";

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {
  order: Order = new DummyOrder;

  constructor(private activatedRoute: ActivatedRoute, private _orderService: OrderService) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id != null) {
      this.fetchOrder(+id);
    }
  }

  fetchOrder(id: number | null): void {
    this._orderService.fetchOrder(id).then( (get) => {
      get.pipe(first()).subscribe( (order: Order) => {
        this.order = order;
      })
    })
  }

  protected readonly onsubmit = onsubmit;
}
