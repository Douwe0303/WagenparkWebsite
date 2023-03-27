import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { OrderService } from "../../service/order.service";
import { first, Observable } from "rxjs";
import { Order } from "../../interface/order";
import {Sorting} from "../../enum/sorting";

@Component({
  selector: 'app-tableheaders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];
  sorting: Sorting = Sorting.DESC;
  sortingField: string = "id";

  constructor(private router: Router, private _orderService: OrderService) {
  }

  ngOnInit(): void {
    this._orderService.fetchOrders().then((orders: Observable<any>) => {
      orders.pipe(first()).subscribe((orders) => {
        this.orders = orders;
      });
    });
  }

  translateStatus(status: string, id: number | undefined): string {
    switch(status) {
      case 'ORDERED':
        // @ts-ignore
        document.getElementById('status'+id).classList.add('bg-primary');
        return "besteld";
      case 'DELIVERED':
        // @ts-ignore
        document.getElementById('status'+id).classList.add('bg-success');
        return "geleverd";
      case 'DELAYED':
        // @ts-ignore
        document.getElementById('status'+id).classList.add('bg-warning');
        return "vertraagd";
      case 'SHIPPED':
        // @ts-ignore
        document.getElementById('status'+id).classList.add('bg-secondary');
        return "onderweg";
      case 'UKNOWN':
        return "onbekend";
      case 'CANCELED':
        // @ts-ignore
        document.getElementById('status'+id).classList.add('bg-danger');
        return "geannuleerd";
      case 'PROCESSED':
        // @ts-ignore
        document.getElementById('status'+id).classList.add('bg-dark');
        return "verwerkt";
      default:
        return "dummy";
    }
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
    // @ts-ignore
    this.orders.push(order);
  }

  prompt(show: boolean, id: number | undefined): void {
    if(show) {
      // @ts-ignore
      let span = document.getElementById('actions_'+id).style.display = 'none';

      // @ts-ignore
      document.getElementById('delete_prompt_'+id).style.display = 'flex';
    } else {
      // @ts-ignore
      document.getElementById('delete_prompt_'+id).style.display = 'none';

      // @ts-ignore
      document.getElementById('actions_'+id).style.display = 'flex';

      console.log("Show");
    }
  }
}
