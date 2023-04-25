import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TableDataDirective } from "../../../directive/table-data.directive";

@Component({
  selector: '[app-table-data]',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.css']
})
export class TableDataComponent implements OnInit, TableDataComponent{
  @Input() data: any;

  @ViewChild(TableDataDirective, {static: true}) appTableData!: TableDataDirective;

  ngOnInit(): void {
    const viewContainerRef = this.appTableData.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<TableDataComponent>(this.data.component);
    componentRef.instance.data = this.data;
  }
}
