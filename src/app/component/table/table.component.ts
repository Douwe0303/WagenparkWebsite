import { Component, Input } from '@angular/core';
import { TableHeader } from "../../interface/table-header";
import { SortingType } from "../../enum/sorting-type";
import { Sorting } from "../../interface/sorting";

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
  @Input() searchText: string = "";
  @Input() apiURL: string = "";
  @Input() searchIndex: number = 0;

  sorting: SortingType = SortingType.ASC;
  @Input() sortingIndex: number = 0;

  setSorting(properties: Sorting) {
    this.sorting = properties.sorting;
    this.sortingIndex = properties.index;
  }
}
