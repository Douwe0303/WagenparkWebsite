import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgbDropdown } from "@ng-bootstrap/ng-bootstrap";
import {TableDataComponent} from "../../../../interface/table-data";
import {OrderStatus} from "../../../../class/order-status/order-status";
import {EventService} from "../../../../service/event/event.service";

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements TableDataComponent {
  data: any = {
    dropdown: {
      id: 0,
      text: '',
      color: '',
      items: {OrderStatus}
    }
  }

  constructor(public _eventService: EventService) {
  }

  @ViewChild(NgbDropdown, { static: true })
  public dropdown: NgbDropdown | undefined;

  clicked(item: any): void {
    this._eventService.emitStatus(this.data.dropdown.id, this.getValue(item.value, 'code'));
  }

  getValue(value: any, target: string): string {
    return value[target];
  }
}
