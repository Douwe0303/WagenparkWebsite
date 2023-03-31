import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { OrderService } from "../../../service/order/order.service";
import { first } from "rxjs";
import { OrderDto } from "../../../interface/order-dto";

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {
  @Input() items: {data: {}}[] = [];
  @Input() hiddenProperties: string[] = [];

  constructor(private activatedRoute: ActivatedRoute, private _orderService: OrderService){}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id != null) {
      this.fetchOrder(+id);
    }
  }

  fetchOrder(id: number | null): void {
    this._orderService.fetchOrder(id).then( (get) => {
      get.pipe(first()).subscribe( (order: OrderDto) => {
        // this.order = order;
      })
    })
  }
}
