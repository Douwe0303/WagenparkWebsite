import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { OrderService } from "../../../service/order/order.service";
import { first } from "rxjs";
import { OrderDto } from "../../../interface/dto/order-dto";
import {OrderTransformer} from "../../../class/transformer/order-transformer/order-transformer";
import {Order} from "../../../interface/model/order";
import {LeasecarTransformer} from "../../../class/transformer/leasecar-transformer/leasecar-transformer";
import {ContractTransformer} from "../../../class/transformer/contract-transformer/contract-transformer";
import {Title} from "@angular/platform-browser";
import {OrderDummy} from "../../../class/dummy/order-dummy/order-dummy";
import {FileService} from "../../../service/file/file.service";
import {EditOrderComponent} from "../edit-order/edit-order.component";

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css'],
  providers: [OrderTransformer, LeasecarTransformer, ContractTransformer],
})
export class ViewOrderComponent implements OnInit {
  order: Order = new OrderDummy();
  view: boolean = true;

  @ViewChild(EditOrderComponent)
  private editOrderComponent!: EditOrderComponent;

  @Input() items: {data: {}}[] = [];
  @Input() hiddenProperties: string[] = [];
  @Input() clickableProperties: string[] = [];
  @Input() titles: string[] = [];

  @Output() clickEvent = new EventEmitter<any>();

  constructor(private activatedRoute: ActivatedRoute,
              private _orderService: OrderService,
              private orderTransformer: OrderTransformer,
              private titleService: Title,
              private _fileService: FileService
  ){}

  clicked(value: any): void {
    this.clickEvent.emit(value);
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const action = this.activatedRoute.snapshot.paramMap.get('action');

    if(id != null) {
      this.setAction(action);
      this.setTitle(id);
      this.fetchOrder(+id);
    }
  }

  setAction(action: string | null) {
    switch(action) {
      case 'view':
        this.view = true;
        break;
      case 'edit':
        this.view = false;
        break;
      default: this.view = true;
    }
  }

  setTitle(id: string) {
    this.titleService.setTitle('Bestelling '+id);
  }

  fetchOrder(id: number | null): void {
    this._orderService.fetchOrder(id).then( (get) => {
      get.pipe(first()).subscribe( (orderDto: OrderDto) => {
        let order: Order = this.orderTransformer.toModel(orderDto);
        this.order = order;
        console.log(this.order);
        // this.editOrderComponent.initFiles(order.data.leasePlanPath.value);
        // this.editOrderComponent.initFiles(order.data.quotationPath.value);
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
