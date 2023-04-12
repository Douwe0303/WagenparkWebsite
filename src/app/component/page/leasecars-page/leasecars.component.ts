import { Component } from '@angular/core';
import { Leasecar } from "../../../interface/model/leasecar";
import { LeasecarDummy } from "../../../class/dummy/leasecar-dummy/leasecar-dummy";
@Component({
  selector: 'app-tableheaders',
  templateUrl: './leasecars.component.html',
  styleUrls: ['./leasecars.component.css']
})
export class LeasecarsComponent {

  leasecar: Leasecar = new LeasecarDummy();

  delete(id: number): void {
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
