import { Component } from '@angular/core';
import { Leasecar } from "../../interface/model/leasecar";
import { LeasecarDummy } from "../../dummy/leasecar-dummy/leasecar-dummy";
import { EngineType } from "../../type/engine-type/engine-type";
import { ContractType } from "../../type/contract-type/contract-type";

@Component({
  selector: 'app-leasecar-form',
  templateUrl: './leasecar-form.component.html',
  styleUrls: ['./leasecar-form.component.css']
})
export class LeasecarFormComponent {

  leasecar: Leasecar = LeasecarDummy;
  protected readonly EngineType = EngineType;
  protected readonly ContractType = ContractType;

  busy: boolean = false;
}
