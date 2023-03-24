import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { OrderService } from "../../service/order.service";
import { first, Observable } from "rxjs";
import { Order } from "../../interface/order";

@Component({
  selector: 'app-tableheaders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[] | undefined;

  constructor(private router: Router, private _orderService: OrderService) {
  }

  ngOnInit(): void {
    this._orderService.fetchOrders().then((orders: Observable<any>) => {
      orders.pipe(first()).subscribe((orders) => {
        this.orders = orders;
      });
    });
  }

  translateStatus(status: string): string {
    switch(status) {
      case 'ORDERED':
        return "besteld";
      case 'DELIVERED':
        return "geleverd";
      case 'DELAYED':
        return "vertraagd";
      default:
        return "dummy";
    }
  }

  rotate(id: number | undefined): void {

    // @ts-ignore
   let expanded: string = document.getElementById('row'+id).getAttribute('aria-expanded');

    // @ts-ignore
    let arrow: HTMLElement = document.getElementById('arrow'+id);

    if(expanded == 'true') {
      arrow.classList.replace('close-arrow', 'open-arrow');
      arrow.title = 'Sluit';
    }
    else if(expanded == 'false') {
      arrow.classList.replace('open-arrow', 'close-arrow');
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
