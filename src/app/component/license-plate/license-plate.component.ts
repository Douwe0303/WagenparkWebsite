import {Component, Input} from '@angular/core';
import { TableDataComponent } from "../../interface/table-data";

@Component({
  selector: 'app-license-plate',
  templateUrl: './license-plate.component.html',
  styleUrls: ['./license-plate.component.css']
})
export class LicensePlateComponent implements TableDataComponent {
  @Input() data: any = {
    countryCode: "",
    licensePlate: ""
  }
}
