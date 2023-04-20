import {
  Component,
  ComponentRef,
  EventEmitter,
  Input, OnInit,
  Output, QueryList,
  Type,
  ViewChild,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import { TableDataComponent } from "../table-data/table-data.component";
import {TableBodyComponent} from "../table-body/table-body.component";
import {Action} from "rxjs/internal/scheduler/Action";
import {ActionsComponent} from "../actions/actions.component";

@Component({
  selector: '[app-table-row]',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css']
})
export class TableRowComponent implements OnInit{
  // row data

  @Input() id: number = 0;
  @Input() dataBsToggle: string = "collapse";
  @Input() ariaExpanded: boolean = false;
  @Input() class: string = "";

  @Output() clickEvent: EventEmitter<any> = new EventEmitter<any>();

  @ViewChildren('dynamic', {read: ViewContainerRef}) dynamic: QueryList<ViewContainerRef> = new QueryList<ViewContainerRef>();
  @Input() componentRef: ComponentRef<TableDataComponent> | undefined;

  ngOnInit() {
    this.dynamic.map((vcr: ViewContainerRef, index: number) => {
      vcr.clear();
      this.componentRef = vcr.createComponent(TableDataComponent);
      this.componentRef.instance.data = new ActionsComponent();
    })
  }
}
