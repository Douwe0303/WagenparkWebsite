import { Component, Input } from '@angular/core';
import { TableHeader } from "../../interface/table-header";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  @Input() headers: TableHeader[] = [];
  @Input() rowData: string[][] = [];
  @Input() fullData: {}[][] = [];
  @Input() titles: string[] = [];
  @Input() hiddenProperties: string[] = [];
}
