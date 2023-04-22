import { Component, Input } from '@angular/core';
import { TableDataComponent} from "../../interface/table-data";

@Component({
  selector: 'app-text-no-wrap',
  templateUrl: './text-no-wrap.component.html',
  styleUrls: ['./text-no-wrap.component.css']
})
export class TextNoWrapComponent implements TableDataComponent {
  @Input() data: any = {
    nowrap: {
      class: "",
      text: ""
    }
  }
}
