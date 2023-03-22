import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {OrderService} from "../../service/order.service";
import {Observable} from "rxjs";
import {Order} from "../../interface/order";

@Component({
  selector: 'app-tableheaders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Observable<Order[]> | undefined;

  constructor(private router: Router, private _orderService: OrderService) {

  }

  ngOnInit(): void {
    this._orderService.fetchOrders().then((orders: Observable<any>) => {
      this.orders = orders;
    })
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

  rotate(id: number): void {

    // @ts-ignore
    let arrow: HTMLElement = document.getElementById('arrow'+id);

    // @ts-ignore
    let title: string = arrow.title;

    if(title == 'Open') {
      arrow.classList.replace('close-arrow', 'open-arrow');
      arrow.title = 'Close';
    }
    else if(title == 'Close') {
      arrow.classList.replace('open-arrow', 'close-arrow');
      arrow.title = 'Open';
    }
  }

  delete(id: number): void {
  }

  open(id: number): void {
    this.router.navigate(['/orders/' + id]);
  }

  prompt(show: boolean, id: number): void {
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
