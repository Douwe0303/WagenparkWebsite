import { Component, OnInit, ViewChild } from '@angular/core';
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
import { TextNoWrapComponent } from "../../text-no-wrap/text-no-wrap.component";
import { ActionsComponent } from "../../actions/actions.component";
import { LicensePlateComponent } from "../../license-plate/license-plate.component";
import { RotateArrowComponent } from "../../rotate-arrow/rotate-arrow.component";
import { RowData } from "../../../interface/row-data";

@Component({
  selector: 'app-tableheaders',
  templateUrl: './leasecars.component.html',
  styleUrls: ['./leasecars.component.css'],
  providers: [LeasecarTransformer, ContractTransformer]
})
export class LeasecarsComponent implements OnInit {

  LeaseCarTableHeader = LeasecarTableHeader;
  LeaseCarDummy = LeasecarDummy;

  rowData: RowData[] = [];
  fullData: {}[][] = [];
  searchText: string = "";

  @ViewChild(ToastComponent)
  toast: ToastComponent = new ToastComponent();

  constructor(
    private _leaseCarService: LeasecarService,
    private leaseCarTransformer: LeasecarTransformer,
    private titleService: Title,
  ) {}

  ngOnInit(): void {
    this.fetchOrders();
    this.titleService.setTitle("Leaseauto's");
  }

  rowClicked(id: number): void {
    this.rotateArrow(id);
  }

  rotateArrow(id: number): void {
    // @ts-ignore
    let expanded = document.getElementById('row-'+id).getAttribute('aria-expanded');

    if(expanded == 'true') {
      // @ts-ignore
      document.getElementById('rotate-up-'+id).dispatchEvent(new MouseEvent('click'));
    } else {
      // @ts-ignore
      document.getElementById('rotate-down-'+id).dispatchEvent(new MouseEvent('click'));
    }
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
      this.addRowData(leaseCar);
      this.addFullData(leaseCar);
    }
  }

  addRowData(leaseCar: Leasecar): void {
    let rowData: RowData = {
      id: leaseCar.id.value as number,
      tableData: []
    }

    for(let header of LeasecarTableHeader) {

      if (header.key == 'duration') {
        rowData.tableData.push({
          nowrap: {
            class: '',
            text: leaseCar['contract']['duration'].toDisplay as string,
          },
          component: TextNoWrapComponent
        });
      } else if (header.key == 'licensePlate') {
        rowData.tableData.push({
          licensePlate: {
            country: 'NL',
            code: leaseCar['licensePlate'].toDisplay as string,
          },
          component: LicensePlateComponent
        });
      } else {
        rowData.tableData.push({
          nowrap: {
            class: '',
            // @ts-ignore
            text: leaseCar[header.key].toDisplay as string,
          },
          component: TextNoWrapComponent
        });
      }
    }

    rowData.tableData.push({ component: ActionsComponent});
    rowData.tableData.push({ rotateArrow: { id: leaseCar['id'].toDisplay, class: 'trash-color pointer-hover rotate-to-0', title: 'open' }, component: RotateArrowComponent });

    this.rowData.push(rowData);
  }

  addFullData(leaseCar: Leasecar): void {
    this.fullData.push([leaseCar, leaseCar.contract]);
  }
}
