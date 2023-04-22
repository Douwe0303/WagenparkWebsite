import { Component, Input } from '@angular/core';
import {TableDataComponent} from "../../interface/table-data";

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements TableDataComponent {
  @Input() data: any = {
    id: 0,
    targetId: 0,
    apiURL: ''
  }

  delete: boolean = true;
  confirmDelete: boolean = false;

  prompt(): void {
    if(this.delete) {
      this.delete = false;
      this.confirmDelete = true;
    } else {
      this.delete = true;
      this.confirmDelete = false;
    }
  }
}
