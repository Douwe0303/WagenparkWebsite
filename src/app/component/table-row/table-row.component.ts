import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: '[app-table-row]',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css']
})
export class TableRowComponent{
  @Input() tableData: any[] = [];
  @Output() clickEvent: EventEmitter<any> = new EventEmitter<any>();
}
