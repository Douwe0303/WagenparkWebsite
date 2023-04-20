import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgbDropdown } from "@ng-bootstrap/ng-bootstrap";
import { DropdownData } from "../../interface/dropdown-data";

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent {

  dropdownData: DropdownData = {
    id: 0,
    color: 'secondary',
    text: '',
    data: []
  }

  @Output() clickEvent: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild(NgbDropdown, { static: true })
  public dropdown: NgbDropdown | undefined;

  openStatusMenu(): void {
    this.dropdown?.open();
  }

  clicked(value: string): void {
    this.clickEvent.emit(value);
  }
}
