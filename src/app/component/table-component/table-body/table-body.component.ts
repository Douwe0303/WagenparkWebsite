import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { SortingType } from "../../../enum/sorting-type";
import { TableDataDirective } from "../../../directive/table-data.directive";
import { RowData } from "../../../interface/row-data";

@Component({
  selector: '[app-table-body]',
  templateUrl: './table-body.component.html',
  styleUrls: ['./table-body.component.css']
})
export class TableBodyComponent {

  @Input() rowData: RowData[] = [];
  @Input() apiURL: string = "";
  @Input() titles: string[] = [];
  @Input() hiddenProperties: string[] = [];
  @Input() sorting: SortingType = SortingType.ASC;
  @Input() sortingIndex: number = 0;
  @Input() searchIndex: number = 0;

  @Output() rowClickEvent: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild(TableDataDirective,{static: true}) appTableData!: TableDataDirective;
}
