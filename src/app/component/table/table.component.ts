import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableHeader } from "../../interface/table-header";
import { SortingType } from "../../enum/sorting-type";
import { Sorting } from "../../interface/sorting";
import { TableDataComponent } from "../table-data/table-data.component";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  @Input() headers: TableHeader[] = [];
  @Input() rowData: any[][] = [];
  @Input() fullData: {}[][] = [];
  @Input() titles: string[] = [];
  @Input() hiddenProperties: string[] = [];
  @Input() searchText: string = "";
  @Input() apiURL: string = "";
  @Input() searchIndex: number = 0;

  sorting: SortingType = SortingType.ASC;
  @Input() sortingIndex: number = 0;

  @Output() deleteEvent: EventEmitter<{id: string, index: number}> = new EventEmitter();

  setSorting(properties: Sorting) {
    this.sorting = properties.sorting;
    this.sortingIndex = properties.index;
  }
}
