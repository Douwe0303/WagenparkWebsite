import {Component, Input} from '@angular/core';
import {TableData} from "../../interface/table-data";

@Component({
  selector: 'app-text-no-wrap',
  templateUrl: './text-no-wrap.component.html',
  styleUrls: ['./text-no-wrap.component.css']
})
export class TextNoWrapComponent implements TableData {
  @Input() data: any = {
    class: "",
    text: ""
  }
}
