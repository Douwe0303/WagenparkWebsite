import {Component, OnInit, ViewChild} from '@angular/core';
import { Leasecar } from "../../../interface/model/leasecar";
import { LeasecarDummy } from "../../../dummy/leasecar-dummy/leasecar-dummy";
import { LeasecarTableHeader } from "../../../class/leasecar-table-header/leasecar-table-header";
import { LeasecarService } from "../../../service/leasecar/leasecar.service";
import { first } from "rxjs";
import { LeasecarDto } from "../../../interface/dto/leasecar-dto";
import { LeasecarTransformer } from "../../../transformer/leasecar-transformer/leasecar-transformer";
import { ContractTransformer } from "../../../transformer/contract-transformer/contract-transformer";
import { Title } from "@angular/platform-browser";
import { ToastComponent } from "../../toast/toast.component";

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
  searchText: string = "";

  @ViewChild(ToastComponent)
  public toast: ToastComponent = new ToastComponent();

  constructor(
    private _leaseCarService: LeasecarService,
    private leaseCarTransformer: LeasecarTransformer,
    private titleService: Title,
    ) {}

  ngOnInit(): void {
    this.fetchOrders();
    this.titleService.setTitle("Leaseauto's");
  }

  setSearchText(searchText: string): void {
    this.searchText = searchText;
  }

  fetchOrders(): void {
    this._leaseCarService.fetchLeasecars().then(leaseCars =>
      leaseCars.pipe(first()).subscribe(
        (leaseCarDtos: LeasecarDto[]) => this.convertDtos(leaseCarDtos),
        (error: any) => alert(error.statusText)
      )
    );
  };

  convertDtos(leaseCarDtos: LeasecarDto[]): void {
    for(let dto of leaseCarDtos) {
      let leaseCar: Leasecar | undefined = this.leaseCarTransformer.toModel(dto);
      this.leaseCars.push(leaseCar);
      this.addRowData(leaseCar);
      this.addFullData(leaseCar);
    }
  }

  addRowData(leaseCar: Leasecar): void {
    this.rowData.push([
      leaseCar.id.toDisplay as string,
      leaseCar.driver.toDisplay as string,
      leaseCar.licensePlate.toDisplay as string,
      leaseCar.brand.toDisplay as string,
      leaseCar.contract.duration.toDisplay as string
    ]);
  }

  addFullData(leaseCar: Leasecar): void {
    this.fullData.push([leaseCar, leaseCar.contract]);
  }
}
