import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-data-tools',
  templateUrl: './data-tools.component.html',
  styleUrls: ['./data-tools.component.css']
})
export class DataToolsComponent {
  @Input() searchPlaceHolder: string = "";
  @Input() searchAriaLabel: string = "";

  @Input() buttonName: string = "";
  @Input() buttonTitle: string = "";

  searchText: string = "";
  opened: boolean = false;

  scroll(el: any) {
    if(!this.opened) {
      el.scrollIntoView()
    }
    this.opened = !this.opened;
  }
}
