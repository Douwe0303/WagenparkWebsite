import {Component, OnInit} from '@angular/core';
import {Order} from "../../../interface/order";
import {DummyOrder} from "../../../class/dummy-order";
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../../../service/order.service";
import {first} from "rxjs";

@Component({
  selector: 'app-order-data',
  templateUrl: './order-data.component.html',
  styleUrls: ['./order-data.component.css']
})
export class OrderDataComponent implements OnInit {
  order: Order = new DummyOrder;

  status: string | undefined;

  constructor(private activatedRoute: ActivatedRoute, private _orderService: OrderService) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id != null) {
      this.fetchOrder(+id);
    }
  }

  getOrderStatus(status: string): string {
    if(status == "") {
      return "";
    }
    return this._orderService.getOrderStatus(status).text;
  }

  fetchOrder(id: number | null): void {
    this._orderService.fetchOrder(id).then( (get) => {
      get.pipe(first()).subscribe( (order: Order) => {
        this.order = order;
      })
    })
  }
}
