import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.css']
})
export class DataViewComponent {
  @Input() title: string | undefined = "";
  @Input() item = { data: {} };
  @Input() hiddenProperties: string[] = [];
  @Input() jsonProperties: string[] = [];
  @Input() json: boolean = false;

  asIsOrder() {
    return 1;
  }
}
