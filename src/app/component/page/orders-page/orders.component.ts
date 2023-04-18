import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { OrderService } from "../../../service/order/order.service";
import { first } from "rxjs";
import { OrderDto } from "../../../interface/dto/order-dto";
import { Sorting } from "../../../enum/sorting";
import { NgbDropdown} from "@ng-bootstrap/ng-bootstrap";
import { ToastComponent } from "../../toast/toast.component";
import { OrderStatus } from "../../../class/order-status/order-status";
import { Order } from "../../../interface/model/order";
import { OrderTransformer } from "../../../transformer/order-transformer/order-transformer";
import { LeasecarTransformer } from "../../../transformer/leasecar-transformer/leasecar-transformer";
import { OrderHeader } from "../../../class/order-header/order-header";
import { ContractTransformer } from "../../../transformer/contract-transformer/contract-transformer";
import { DatePipe } from "@angular/common";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [OrderTransformer, LeasecarTransformer, ContractTransformer, DatePipe]
})
export class OrdersComponent implements OnInit {

  public orders: Order[] = [];

  public sorting: Sorting = Sorting.ASC;
  public sortingField: string = "id";
  public searchText: string = "";
  public reload: boolean = false;
  private opened: boolean = false;

  @ViewChild(NgbDropdown, { static: true })
  public dropdown: NgbDropdown | undefined;

  @ViewChild(ToastComponent)
  public toastOrder: ToastComponent = new ToastComponent();

  protected readonly OrderHeader = OrderHeader;
  protected readonly OrderStatus = OrderStatus;

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

  asIsOrder() {
    return 1;
  }

  scroll(el: any) {
    if(!this.opened) {
      el.scrollIntoView()
    }
    this.opened = !this.opened;
  }

  fetchOrders(): void {
    this._orderService.fetchOrders().then(orders =>
      orders.pipe(first()).subscribe(
        (orderDtos: OrderDto[]) => this.convertDtos(orderDtos),
        (error: any) => alert(error.statusText),
      )
    )
  };

  convertDtos(orderDtos: OrderDto[]): void {
    for(let dto of orderDtos) {
      let order: Order | undefined = this.orderTransformer.toModel(dto);
      this.orders.push(order);
    }
    this.reloadOrders();
  }

  openStatusMenu(): void {
    this.dropdown?.open();
  }

  setSorting(field: string): void {
    let newId: string = 'sorting-'+field;
    let oldId: string = 'sorting-'+this.sortingField;

    // @ts-ignore
    let toSort: HTMLElement = document.getElementById('sorting-'+field);

    if(field != this.sortingField) {
      this.replaceClass(oldId, 'opacity-100', 'opacity-25');
      this.replaceClass(newId, 'opacity-25', 'opacity-100');
    }

    this.sortingField = field;

    if(toSort.classList.contains('rotate-to-180')) {
      this.sorting = Sorting.ASC;
      this.replaceClass(newId, 'rotate-to-180', 'rotate-to-0');
    } else {
      this.sorting = Sorting.DESC;
      this.replaceClass(newId, 'rotate-to-0', 'rotate-to-180');
    }
  }

  rotateArrow(id: number | undefined): void {

    // @ts-ignore
   let expanded: string = document.getElementById('row'+id).getAttribute('aria-expanded');

    // @ts-ignore
    let arrow: HTMLElement = document.getElementById('arrow'+id);

    if(expanded == 'true') {
      arrow.classList.replace('rotate-to-0', 'rotate-to-180');
      arrow.title = 'Sluit';
    }
    else if(expanded == 'false') {
      arrow.classList.replace('rotate-to-180', 'rotate-to-0');
      arrow.title = 'Open';
    }
  }

  delete(id: number | undefined): void {
    this._orderService.deleteOrder(id).then(call =>
      call.pipe(first()).subscribe(
        () => this.orders = this.orders.filter(order => order.data.id.value !== id),
        (error: any) => alert(error.statusText)
      )
    );
  }

  addOrder(data: any): void {
    this.orders.push(data.order);
  }

  replaceClass(id: string, oldClass: string, newClass: string): void {
    document.getElementById(id)?.classList.replace(oldClass, newClass);
  }

  editStatus(id: number, status: any): void {
    let index: number = this.orders.findIndex(order => order.data.id.value == id);
    let order: Order = this.orders[index];

    let oldStatus: string = order.data.leaseOrderStatus.status.code;
    let oldData: any = order.data.leaseOrderStatus.status;

    if(oldStatus == status.code) {
      return;
    }

    order.data.leaseOrderStatus.value = status.code;
    order.data.leaseOrderStatus.status = status;
    order.data.leaseOrderStatus.toDisplay = status.text;

    let orderDto: OrderDto = this.orderTransformer?.toDto(order);

    this._orderService.editOrder(orderDto).then(r => r.pipe(first()).subscribe(
      () => {
        // @ts-ignore
        this.toastOrder.showToast('Bestelstatus gewijzigd!', id, 'De status van de bestelling is gewijzigd.', 'orange');
        },
      (error: any) => {
        order.data.leaseOrderStatus.value = oldData.code;
        order.data.leaseOrderStatus.status = oldData;
        alert(error.statusText);
      }
      )
    );
  }

  reloadOrders(): void {
    this.reload = !this.reload;
  }

  prompt(show: boolean, id: number | undefined): void {
    if(show) {
      // @ts-ignore
      document.getElementById('actions_'+id).style.display = 'none';

      // @ts-ignore
      document.getElementById('delete_prompt_'+id).style.display = 'flex';
    } else {
      // @ts-ignore
      document.getElementById('delete_prompt_'+id).style.display = 'none';

      // @ts-ignore
      document.getElementById('actions_'+id).style.display = 'flex';
    }
  }
}
