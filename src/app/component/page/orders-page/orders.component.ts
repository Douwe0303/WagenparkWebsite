import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { OrderService } from "../../../service/order/order.service";
import { first } from "rxjs";
import { OrderDto } from "../../../interface/dto/order-dto";
import { NgbDropdown} from "@ng-bootstrap/ng-bootstrap";
import { ToastComponent } from "../../toast/toast.component";
import { Order } from "../../../interface/model/order";
import { OrderTransformer } from "../../../transformer/order-transformer/order-transformer";
import { LeasecarTransformer } from "../../../transformer/leasecar-transformer/leasecar-transformer";
import { ContractTransformer } from "../../../transformer/contract-transformer/contract-transformer";
import { DatePipe } from "@angular/common";
import { Title } from "@angular/platform-browser";
import { OrderTableHeader } from "../../../class/order-table-header/order-table-header";
import { OrderDummy } from "../../../dummy/order-dummy/order-dummy";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [OrderTransformer, LeasecarTransformer, ContractTransformer, DatePipe]
})
export class OrdersComponent implements OnInit {

  protected readonly OrderTableHeader = OrderTableHeader;
  protected readonly OrderDummy = OrderDummy;
  public orders: Order[] = [];
  rowData: string[][] = [];
  fullData: {}[][] = [];
  public searchText: string = "";

  public reload: boolean = false;

  @ViewChild(NgbDropdown, { static: true })
  public dropdown: NgbDropdown | undefined;

  @ViewChild(ToastComponent)
  public toastOrder: ToastComponent = new ToastComponent();

  constructor(
    private router: Router,
    private _orderService: OrderService,
    private orderTransformer: OrderTransformer,
    private titleService: Title,
  ) {}

  ngOnInit(): void {
    this.fetchOrders();
    this.titleService.setTitle('Bestellingen');
  }

  setSearchText(text: string) {
    this.searchText = text;
  }

  fetchOrders(): void {
    this._orderService.fetchOrders().then(orders =>
      orders.pipe(first()).subscribe(
        (orderDtos: OrderDto[]) => this.convertDtos(orderDtos),
        (error: any) => alert(error.statusText)
      )
    );
  };

  convertDtos(orderDtos: OrderDto[]): void {
    for(let dto of orderDtos) {
      let order: Order | undefined = this.orderTransformer.toModel(dto);
      this.orders.push(order);
      this.addRowData(order);
      this.addFullData(order);
    }
  }

  addRowData(order: Order): void {
    this.rowData.push([
      order.id.toDisplay as string,
      order.orderer.toDisplay as string,
      order.leasecar.driver.toDisplay as string,
      order.orderDate.toDisplay as string,
      order.leaseOrderStatus.toDisplay as string
    ]);
  }

  addFullData(order: Order): void {
    this.fullData.push([order, order.leasecar, order.leasecar.contract]);
  }

  delete(id: number | undefined): void {
    this._orderService.deleteOrder(id).then(call =>
      call.pipe(first()).subscribe(
        () => this.orders = this.orders.filter(order => order.id.value !== id),
        (error: any) => alert(error.statusText)
      )
    );
  }

  addOrder(data: any): void {
    this.orders.push(data.order);
  }

  editStatus(id: number, status: any): void {
    let index: number = this.orders.findIndex(order => order.id.value == id);
    let order: Order = this.orders[index];

    let oldStatus: string = order.leaseOrderStatus.status.code;
    let oldData: any = order.leaseOrderStatus.status;

    if(oldStatus == status.code) {
      return;
    }

    order.leaseOrderStatus.value = status.code;
    order.leaseOrderStatus.status = status;
    order.leaseOrderStatus.toDisplay = status.text;

    let orderDto: OrderDto = this.orderTransformer?.toDto(order);

    this._orderService.editOrder(orderDto).then(r => r.pipe(first()).subscribe(
      () => {
        // @ts-ignore
        this.toastOrder.showToast('Bestelstatus gewijzigd!', id, 'De status van de bestelling is gewijzigd.', 'orange');
        },
      (error: any) => {
        order.leaseOrderStatus.value = oldData.code;
        order.leaseOrderStatus.status = oldData;
        alert(error.statusText);
      }
      )
    );
  }

  reloadOrders(): void {
    this.reload = !this.reload;
  }
}
