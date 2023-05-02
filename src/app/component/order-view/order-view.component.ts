import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {first} from "rxjs";
import {OrderService} from "../../service/order/order.service";
import {OrderTransformer} from "../../transformer/order-transformer/order-transformer";
import {OrderDto} from "../../interface/dto/order-dto";
import {Order} from "../../interface/model/order";
import {LeasecarTransformer} from "../../transformer/leasecar-transformer/leasecar-transformer";
import {ContractTransformer} from "../../transformer/contract-transformer/contract-transformer";

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css'],
  providers: [OrderTransformer, LeasecarTransformer, ContractTransformer]
})
export class OrderViewComponent implements OnInit {
  @Input() items: any[] = [];
  @Input() hiddenProperties: string[] = [];
  @Input() titles: string[] = [];
  @Input() id: string | null = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private _orderService: OrderService,
    private _titleService: Title,
    private orderTransformer: OrderTransformer
  ){}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.id) {
      this.getOrder(this.id);
      this._titleService.setTitle('Bestelling ' + this.id);
    }
  }

  getOrder(id: string): void {
    this._orderService.fetchOrder(+id).then((read) => {
      read.pipe(first()).subscribe((orderDto: OrderDto) => {
        let order = this.orderTransformer.toModel(orderDto);
        this.setInputs(order);
      })
    })
  }

  setInputs(order: Order): void {
    this.items = [
      order,
      order.leasecar,
      order.leasecar.contract
    ];
    this.hiddenProperties = [
      'id', 'contract', 'leasecar', 'leaseOrderId'
    ];
    this.titles = [
      'Bestelling', 'Leaseauto', 'Contract'
    ];
  }
}
