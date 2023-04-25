import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableHeader } from "../../../interface/table-header";
import { RowData } from "../../../interface/row-data";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  @Input() headers: TableHeader[] = [];
  @Input() rowData: RowData[] = [];
  @Input() titles: string[] = [];
  @Input() hiddenProperties: string[] = [];
  @Input() apiURL: string = "";
  @Input() searchIndex: number = 0;

  @Output() rowClickEvent: EventEmitter<number> = new EventEmitter<number>();
}
