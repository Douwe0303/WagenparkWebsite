import {Component, Input } from '@angular/core';

@Component({
  selector: '[app-table-data]',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.css']
})
export class TableDataComponent {
  class: string = "";
  @Input() data: any;
}
