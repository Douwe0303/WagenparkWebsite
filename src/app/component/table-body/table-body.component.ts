import {Component, EventEmitter, Input, OnInit, Output, Type} from '@angular/core';
import { SortingType } from "../../enum/sorting-type";
import { ToastData } from "../../interface/toast-data";
import {TableDataComponent} from "../table-data/table-data.component";
import {TableRowComponent} from "../table-row/table-row.component";
import {ActionsComponent} from "../actions/actions.component";

@Component({
  selector: '[app-table-body]',
  templateUrl: './table-body.component.html',
  styleUrls: ['./table-body.component.css']
})
export class TableBodyComponent implements OnInit {

  @Input() rowData: string[][] = [];
  @Input() fullData: {}[][] = [];
  @Input() searchText: string = "";
  @Input() apiURL: string = "";
  @Input() titles: string[] = [];
  @Input() hiddenProperties: string[] = [];
  @Input() sorting: SortingType = SortingType.ASC;
  @Input() sortingIndex: number = 0;
  @Input() searchIndex: number = 0;

  @Output() showToastEvent: EventEmitter<ToastData> = new EventEmitter<ToastData>();

  ngOnInit() {
    // let td: Type<TableDataComponent> = new TableDataComponent();
    // td.data = new ActionsComponent();
    // this.tableData.push(td);
  }

  tableData: Type<TableDataComponent>[] = [];

  toastEvent(id: number): void {
    let toastData: ToastData = {
      title: 'Bestelling verwijderd!',
      id: id,
      text: 'De bestelling is verwijderd!',
      color: 'red'
    }
    this.showToastEvent.emit(toastData);
  }

  delete(id: string | undefined): void {
    // this._orderService.deleteOrder(id).then(call =>
    //   call.pipe(first()).subscribe(
    //     () => this.orders = this.orders.filter(order => order.id.value !== id),
    //     (error: any) => alert(error.statusText)
    //   )
    // );
  }

  rotateArrow(id: number): void {

    // @ts-ignore
    let expanded: string = document.getElementById('row'+id).getAttribute('aria-expanded');

    // @ts-ignore
    let arrow: HTMLElement = document.getElementById('arrow'+id);

    if(expanded == 'true') {
      arrow.classList.replace('rotate-to-0', 'rotate-to-180');
      arrow.title = 'Sluit';
    }
    else if(expanded == 'false') {
      arrow.classList.replace('rotate-to-180', 'rotate-to-0');
      arrow.title = 'Open';
    }
  }
}
