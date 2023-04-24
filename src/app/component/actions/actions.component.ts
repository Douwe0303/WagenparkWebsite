import { Component, Input } from '@angular/core';
import { TableDataComponent } from "../../interface/table-data";
import {EventService} from "../../service/event.service";

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements TableDataComponent {
  @Input() data: any = {
    actions: {
      id: 0,
      apiURL: ''
    }
  }

  constructor(private eventService: EventService) {}

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

  deleteEvent(): void {
    this.eventService.emitDelete(this.data.actions.id);
  }
}
