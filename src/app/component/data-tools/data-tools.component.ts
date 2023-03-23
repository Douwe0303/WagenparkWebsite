import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-data-tools',
  templateUrl: './data-tools.component.html',
  styleUrls: ['./data-tools.component.css']
})
export class DataToolsComponent {
  @Input() addText: string = "";
  @Input() searchText: string = "";
  @Input() ariaLabel: string = "";
}
