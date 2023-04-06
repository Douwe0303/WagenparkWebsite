import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Order} from "../../interface/model/order";
import {Leasecar} from "../../interface/model/leasecar";

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.css']
})
export class DataViewComponent {
  @Input() title: string | undefined = "";
  @Input() item = { data: {} };
  @Input() hiddenProperties: string[] = [];
  @Input() clickableProperties: string[] = [];
  @Input() json: boolean = false;

  @Output() clickEvent = new EventEmitter<any>();

  clicked(value: any): void {
    this.clickEvent.emit(value);
  }

  asIsOrder() {
    return 1;
  }
}
