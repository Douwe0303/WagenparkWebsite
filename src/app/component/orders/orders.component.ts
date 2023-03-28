import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { OrderService } from "../../service/order.service";
import { first, Observable } from "rxjs";
import { Order } from "../../interface/order";
import { Sorting } from "../../enum/sorting";
import { NgbDropdown } from "@ng-bootstrap/ng-bootstrap";
import { OrderStatus } from "../../class/order-status";

@Component({
  selector: 'app-tableheaders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];
  sorting: Sorting = Sorting.ASC;
  sortingField: string = "id";
  searchText: string = "";
  reload: boolean = false;
  show = false;

  @ViewChild(NgbDropdown, { static: true })
  public dropdown: NgbDropdown | undefined;

  readonly OrderStatus = OrderStatus;

  constructor(private router: Router, private _orderService: OrderService) {}

  ngOnInit(): void {
    this._orderService.fetchOrders().then((orders: Observable<any>) => {
      orders.pipe(first()).subscribe((orders) => {
        this.orders = orders;
      });
    });
  }

  openStatusMenu(): void {
    this.dropdown?.open();
  }

  showToast(toastTitle: string, toastId: number | undefined, toastBody: string, color: string): void {
    // @ts-ignore
    let title: HTMLElement = document.getElementById('toastTitle');

    title.innerText = toastTitle;
    title.style.color = color;

     // @ts-ignore
    document.getElementById('toastId').innerText = "ID: " + toastId;

    // @ts-ignore
    document.getElementById('toastBody').innerText = toastBody;

    this.show = true;
  }

  translateStatus(status: string, id: number | undefined): string {
    let statusId: string = 'status'+id;
    let defaultClass: string = 'btn-primary';
    let orderStatus: any = this.getOrderStatus(status);

    this.replaceClass(statusId, defaultClass, 'btn-'+orderStatus.color);

    return orderStatus.text;
  }

  setSorting(field: string): void {
    // @ts-ignore
    let toSort: HTMLElement = document.getElementById('sorting-'+field);

    if(field != this.sortingField) {
      // @ts-ignore
      document.getElementById('sorting-'+this.sortingField).classList.replace('opacity-100', 'opacity-25')
      // @ts-ignore
      toSort.classList.replace('opacity-25', 'opacity-100');
    }

    this.sortingField = field;

    if(toSort.classList.contains('rotate-to-180')) {
      this.sorting = Sorting.ASC;
      toSort.classList.replace('rotate-to-180', 'rotate-to-0');
    } else {
      this.sorting = Sorting.DESC;
      toSort.classList.replace('rotate-to-0', 'rotate-to-180');
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
    this._orderService.deleteOrder(id).then((call) => {
      call.pipe(first()).subscribe(() => {
        // @ts-ignore
        this.orders = this.orders.filter(order => order.id !== id);
      })
      //TODO: catch error and show error to client
    }).catch((error) => {
      console.log(error);
    })
  }

  addOrder(order: Order): void {
    this.orders.push(order);
  }

  replaceClass(id: string, oldClass: string, newClass: string): void {
    document.getElementById(id)?.classList.replace(oldClass, newClass);
  }

  editStatus(id: number, status: any): void {
    let index: number = this.orders.findIndex(order => order.id == id);
    let order: Order = this.orders[index];

    let oldStatus: any = this.getOrderStatus(order.leaseOrderStatus);
    let newStatus: any = this.getOrderStatus(status.code);

    order.leaseOrderStatus = status.code;

    this._orderService.editOrder(order).then(r => r.pipe(first()).subscribe(() => {
      this.showToast('Bestelstatus gewijzigd!', id, 'De status van de bestelling is gewijzigd.', 'orange');
      this.replaceClass('status'+id, 'btn-'+oldStatus.color, 'btn-'+newStatus.color);
    }));
  }

  getOrderStatus(status: string): any {
    switch(status) {
      case OrderStatus.ordered.code:
        return OrderStatus.ordered;

      case OrderStatus.delivered.code:
        return OrderStatus.delivered;

      case OrderStatus.delayed.code:
        return OrderStatus.delayed;

      case OrderStatus.shipped.code:
        return OrderStatus.shipped;

      case OrderStatus.unknown.code:
        return OrderStatus.unknown;

      case OrderStatus.canceled.code:
        return OrderStatus.canceled;

      case OrderStatus.processed.code:
        return OrderStatus.processed;
    }
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
