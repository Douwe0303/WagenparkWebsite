import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: '[app-table-row]',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css']
})
export class TableRowComponent{
  // row data

  // @Input() id: number = 0;
  // @Input() dataBsToggle: string = "collapse";
  // @Input() ariaExpanded: boolean = false;
  // @Input() class: string = "";

  @Input() tableData: any[] = [];
  @Output() clickEvent: EventEmitter<any> = new EventEmitter<any>();

  log(data: any): void {
    console.log(data);
  }
}
