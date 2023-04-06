import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { OrderService } from "../../../service/order/order.service";
import { first } from "rxjs";
import { OrderDto } from "../../../interface/dto/order-dto";
import {OrderTransformer} from "../../../class/transformer/order-transformer/order-transformer";
import {Order} from "../../../interface/model/order";
import {LeasecarTransformer} from "../../../class/transformer/leasecar-transformer/leasecar-transformer";
import {ContractTransformer} from "../../../class/transformer/contract-transformer/contract-transformer";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css'],
  providers: [OrderTransformer, LeasecarTransformer, ContractTransformer]
})
export class ViewOrderComponent implements OnInit {
  @Input() items: {data: {}}[] = [];
  @Input() hiddenProperties: string[] = [];
  @Input() clickableProperties: string[] = [];
  @Input() titles: string[] = [];

  @Output() clickEvent = new EventEmitter<any>();

  constructor(private activatedRoute: ActivatedRoute, private _orderService: OrderService, private orderTransformer: OrderTransformer, private titleService: Title){}

  clicked(value: any): void {
    this.clickEvent.emit(value);
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id != null) {
      this.setTitle(id);
      this.fetchOrder(+id);
    }
  }

  setTitle(id: string) {
    this.titleService.setTitle('Bestelling '+id);
  }

  fetchOrder(id: number | null): void {
    this._orderService.fetchOrder(id).then( (get) => {
      get.pipe(first()).subscribe( (orderDto: OrderDto) => {
        let order: Order = this.orderTransformer.toModel(orderDto);
        this.setInputs(order);
      })
    })
  }

  setInputs(order: Order): void {
    this.items = [
      order,
      order.data.leasecar,
      order.data.leasecar.data.contract
    ];
    this.hiddenProperties = [
      'leasecar', 'id', 'contract'
    ];
    this.clickableProperties = [
      'leasePlanPath', 'quotationPath'
    ];
    this.titles = [
      'Informatie', 'Leaseauto', 'Contract'
    ];
  }
}
