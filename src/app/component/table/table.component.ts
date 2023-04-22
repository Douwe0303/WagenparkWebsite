import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableHeader } from "../../interface/table-header";
import { SortingType } from "../../enum/sorting-type";
import { Sorting } from "../../interface/sorting";
import { RowData } from "../../interface/row-data";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  @Input() headers: TableHeader[] = [];
  @Input() rowData: RowData[] = [];
  @Input() fullData: {}[][] = [];
  @Input() titles: string[] = [];
  @Input() hiddenProperties: string[] = [];
  @Input() searchText: string = "";
  @Input() apiURL: string = "";
  @Input() searchIndex: number = 0;

  sorting: SortingType = SortingType.ASC;
  @Input() sortingIndex: number = 0;

  @Output() deleteEvent: EventEmitter<{id: string, index: number}> = new EventEmitter();
  @Output() rowClickEvent: EventEmitter<number> = new EventEmitter<number>();

  setSorting(properties: Sorting) {
    this.sorting = properties.sorting;
    this.sortingIndex = properties.index;
  }
}
