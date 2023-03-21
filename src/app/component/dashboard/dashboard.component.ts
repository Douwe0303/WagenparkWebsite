import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private router: Router) {
  }

  directTo(path: string): void {
    switch(path) {
      case 'leasecars':
        this.router.navigate(['leasecars']);
        break;
      case 'orders':
        this.router.navigate(['orders']);
        break;
    }
  }
}
