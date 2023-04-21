import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { SortingType } from "../../enum/sorting-type";
import { ToastData } from "../../interface/toast-data";
import { ActionsComponent } from "../actions/actions.component";
import { TextNoWrapComponent } from "../text-no-wrap/text-no-wrap.component";
import { TableDataDirective } from "../../directive/table-data.directive";

@Component({
  selector: '[app-table-body]',
  templateUrl: './table-body.component.html',
  styleUrls: ['./table-body.component.css']
})
export class TableBodyComponent implements OnInit{

  @Input() rowData: any[][] = [];
  @Input() fullData: {}[][] = [];
  @Input() searchText: string = "";
  @Input() apiURL: string = "";
  @Input() titles: string[] = [];
  @Input() hiddenProperties: string[] = [];
  @Input() sorting: SortingType = SortingType.ASC;
  @Input() sortingIndex: number = 0;
  @Input() searchIndex: number = 0;

  @Output() rowClickEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() showToastEvent: EventEmitter<ToastData> = new EventEmitter<ToastData>();

  public components: {data: any, component: any}[] = [];

  @ViewChild(TableDataDirective,{static: true}) appTableData!: TableDataDirective;

  // for demo only
  @Output() deleteEvent: EventEmitter<{id: string, index: number }> = new EventEmitter<{id: string, index: number }>();

  ngOnInit(): void {
    let component: any = ActionsComponent;
    let data = { data: {id: 5, targetId: 5, apiURL: 'test123'}, class: '', component: component };
    this.components.push(data);
    this.components.push(data);
    this.components.push(data);
  }

  toastEvent(id: number): void {
    let toastData: ToastData = {
      title: 'Bestelling verwijderd!',
      id: id,
      text: 'De bestelling is verwijderd!',
      color: 'red'
    }
    this.showToastEvent.emit(toastData);
  }

  delete(id: string, index: number): void {
    this.deleteEvent.emit({id: id, index: index});
  }

  protected readonly TextNoWrapComponent = TextNoWrapComponent;
}
