import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { OrderService } from "../../../service/order/order.service";
import { first } from "rxjs";
import { OrderDto } from "../../../interface/dto/order-dto";
import {OrderTransformer} from "../../../transformer/order-transformer/order-transformer";
import {Order} from "../../../interface/model/order";
import {LeasecarTransformer} from "../../../transformer/leasecar-transformer/leasecar-transformer";
import {ContractTransformer} from "../../../transformer/contract-transformer/contract-transformer";
import {Title} from "@angular/platform-browser";
import {OrderDummy} from "../../../dummy/order-dummy/order-dummy";
import {EditOrderComponent} from "../edit-order/edit-order.component";
import {ToastComponent} from "../../toast/toast.component";

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css'],
  providers: [OrderTransformer, LeasecarTransformer, ContractTransformer],
})
export class ViewOrderComponent implements OnInit {
  order: Order = new OrderDummy();
  view: boolean = true;
  id: string | null = "";

  @ViewChild(EditOrderComponent)
  private editOrderComponent!: EditOrderComponent;

  @ViewChild(ToastComponent)
  public toastOrder: ToastComponent = new ToastComponent();

  @Input() items: {data: {}}[] = [];
  @Input() hiddenProperties: string[] = [];
  @Input() clickableProperties: string[] = [];
  @Input() titles: string[] = [];

  @Output() clickEvent = new EventEmitter<any>();

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private _orderService: OrderService,
              private orderTransformer: OrderTransformer,
              private titleService: Title
  ){}

  clicked(value: any): void {
    this._fileService.downloadFile(value);
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    const action = this.activatedRoute.snapshot.paramMap.get('action');

    if(this.id != null) {
      this.setAction(action);
      this.setTitle(this.id);
      this.fetchOrder(+this.id);
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
      get.pipe(first()).subscribe(
        (orderDto: OrderDto) => {
        let order: Order = this.orderTransformer.toModel(orderDto);
        this.order = order;
        this.setInputs(order);
        },
        () => {
          this.router.navigate(['/order-not-found']);
        }
      )
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
