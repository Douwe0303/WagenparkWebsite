import { Component } from '@angular/core';
@Component({
  selector: 'app-tableheaders',
  templateUrl: './leasecars.component.html',
  styleUrls: ['./leasecars.component.css']
})
export class LeasecarsComponent {

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
