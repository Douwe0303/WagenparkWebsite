import { Component, OnInit } from '@angular/core';
import { Leasecar } from "../../../interface/model/leasecar";
import { LeasecarDummy } from "../../../dummy/leasecar-dummy/leasecar-dummy";
import { LeasecarTableHeader } from "../../../class/leasecar-table-header/leasecar-table-header";
import { LeasecarService } from "../../../service/leasecar/leasecar.service";
import { first } from "rxjs";
import { LeasecarDto } from "../../../interface/dto/leasecar-dto";
import { LeasecarTransformer } from "../../../transformer/leasecar-transformer/leasecar-transformer";
import { ContractTransformer } from "../../../transformer/contract-transformer/contract-transformer";

@Component({
  selector: 'app-tableheaders',
  templateUrl: './leasecars.component.html',
  styleUrls: ['./leasecars.component.css'],
  providers: [LeasecarTransformer, ContractTransformer]
})
export class LeasecarsComponent implements OnInit {

  LeaseCarTableHeader = LeasecarTableHeader;
  protected readonly LeaseCarDummy = LeasecarDummy;

  public leaseCars: Leasecar[] = [];
  rowData: string[][] = [];
  fullData: {}[][] = [];

  constructor(private _leaseCarService: LeasecarService, private leaseCarTransformer: LeasecarTransformer) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this._leaseCarService.fetchLeasecars().then(leaseCars =>
      leaseCars.pipe(first()).subscribe(
        (leaseCarDtos: LeasecarDto[]) => this.convertDtos(leaseCarDtos),
        (error: any) => alert(error.statusText),
      )
    )
  };

  convertDtos(leaseCarDtos: LeasecarDto[]): void {
    for(let dto of leaseCarDtos) {
      let leaseCar: Leasecar | undefined = this.leaseCarTransformer.toModel(dto);
      this.leaseCars.push(leaseCar);
      this.addRowData(leaseCar);
      this.addFullData(leaseCar);
    }
    // this.reloadOrders();
  }

  addRowData(leaseCar: Leasecar): void {
    this.rowData.push([
      leaseCar.id.toDisplay as string,
      leaseCar.driver.toDisplay as string,
      leaseCar.licensePlate.toDisplay as string,
      leaseCar.brand.toDisplay as string,
      leaseCar.contract.duration.toDisplay as string
    ])
  }

  addFullData(leaseCar: Leasecar): void {
    this.fullData.push([leaseCar, leaseCar.contract]);
  }
}
