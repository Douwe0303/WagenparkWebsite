import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-tableheaders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  constructor(private router: Router) {

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
