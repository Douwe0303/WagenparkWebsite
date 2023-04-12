import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import {Leasecar} from "../../interface/model/leasecar";
@Component({
  selector: 'app-data-input-fields',
  templateUrl: './data-input-fields.component.html',
  styleUrls: ['./data-input-fields.component.css']
})
export class DataInputFieldsComponent {

  @ViewChild('form') myForm: NgForm | undefined;

  @Input() items: Leasecar[] = [];
  @Input() hidden: string[] = [];

  asIsOrder() {
    return 1;
  }
}
