import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Leasecar } from "../../../interface/model/leasecar";
import { LeasecarTableHeader } from "../../../class/leasecar-table-header/leasecar-table-header";
import { LeasecarService } from "../../../service/leasecar/leasecar.service";
import { LeasecarDto } from "../../../interface/dto/leasecar-dto";
import { LeasecarTransformer } from "../../../transformer/leasecar-transformer/leasecar-transformer";
import { ContractTransformer } from "../../../transformer/contract-transformer/contract-transformer";
import { Title } from "@angular/platform-browser";
import { ToastComponent } from "../../toast/toast.component";
import { TextNoWrapComponent } from "../../table-component/table-data-items/text-no-wrap/text-no-wrap.component";
import { ActionsComponent } from "../../table-component/table-data-items/actions/actions.component";
import { LicensePlateComponent } from "../../table-component/table-data-items/license-plate/license-plate.component";
import { RotateArrowComponent } from "../../table-component/table-data-items/rotate-arrow/rotate-arrow.component";
import { RowData } from "../../../interface/row-data";
import { EventService } from "../../../service/event/event.service";
import { first, Subscription } from "rxjs";
import { SortService } from "../../../service/sort/sort.service";

@Component({
  selector: 'app-tableheaders',
  templateUrl: './leasecars.component.html',
  styleUrls: ['./leasecars.component.css'],
  providers: [LeasecarTransformer, ContractTransformer],
})
export class LeasecarsComponent implements OnInit, OnDestroy {

  LeaseCarTableHeader = LeasecarTableHeader;

  rowData: RowData[] = [];
  filteredRowData: RowData[] = [];

  @ViewChild(ToastComponent)
  toast: ToastComponent = new ToastComponent();

  deleteSubscription: Subscription = new Subscription();
  addSubscription: Subscription = new Subscription();
  searchSubscription: Subscription = new Subscription();

  constructor(
    private _leaseCarService: LeasecarService,
    private _titleService: Title,
    private _eventService: EventService,
    private _sortService: SortService,
    private leaseCarTransformer: LeasecarTransformer,
  ) {}
  ngOnDestroy(): void {
    this.deleteSubscription.unsubscribe();
    this.addSubscription.unsubscribe();
    this.searchSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.fetchLeasecars();
    this._titleService.setTitle("Leaseauto's");
    this.sortEvent();
    this.deleteSubscription = this._eventService.deleteEvent.subscribe(deleteEvent => {
      if(deleteEvent.type == 'leasecars') {
        this.delete(deleteEvent.id);
      }
    })
    this.searchSubscription = this._eventService.searchEvent.subscribe(text => {
      this.filteredRowData = this.rowData.filter(row => row.tableData[1].value.toLowerCase().includes(text.toLowerCase()));
    })
    this.addSubscription = this._eventService.addEvent.subscribe(id => {
      this.add(id);
    })
  }

  sortEvent(): void {
    this._eventService.sortingEvent.subscribe(data => {
      this._sortService.sortRowData(data, this.rowData);
    })
  }

  add(id: number): void {
    this._leaseCarService.fetchLeasecar(id).then((get) => {
      get.pipe(first()).subscribe(
        (leaseCarDto: LeasecarDto) => {
          let leasecar: Leasecar = this.leaseCarTransformer.toModel(leaseCarDto);
          this.addRowData(leasecar);
          this.toast.showToast('Leaseauto toegevoegd!', leaseCarDto.id, 'De leaseauto is toegevoegd', 'green');
          // @ts-ignore
          document.getElementById('open-add').click();
        }
      )
    })
  }

  delete(id: number): void {
    this._leaseCarService.deleteLeasecar(id).then((call) => {
      call.pipe(first()).subscribe(
        () => {
          this.toast.showToast('Leaseauto verwijderd!', id, 'De leaseauto is verwijderd.', 'red');
          this.deleteData(id);
        },
        (error: any) => { alert(error.statusText) },
        () => {}
      )
    })
  }

  deleteData(id: number) {
    let index: number = this.rowData.findIndex((rowData) => rowData.id == id);
    this.rowData.splice(index, 1);
  }

  rowClicked(id: number): void {
    this.rotateArrow(id);
  }

  rotateArrow(id: number): void {
    // @ts-ignore
    let expanded: boolean = (document.getElementById('row-'+id).getAttribute('aria-expanded') === 'true');
    this._eventService.emitRotate(id, expanded);
  }

  fetchLeasecars(): void {
    this._leaseCarService.fetchLeasecars().then(leaseCars =>
      leaseCars.pipe().subscribe(
        (leaseCarDtos: LeasecarDto[]) => this.convertDtos(leaseCarDtos),
        (error: any) => alert(error.statusText)
      )
    );
  };

  convertDtos(leaseCarDtos: LeasecarDto[]): void {
    for(let dto of leaseCarDtos) {
      let leaseCar: Leasecar | undefined = this.leaseCarTransformer.toModel(dto);
      this.addRowData(leaseCar);
    }
    this.filteredRowData = this.rowData;
  }

  addRowData(leaseCar: Leasecar): void {
    let rowData: RowData = {
      id: leaseCar.id.value as number,
      tableData: [],
      data: [leaseCar, leaseCar.contract]
    }

    for(let header of LeasecarTableHeader) {

      if (header.key == 'duration') {
        rowData.tableData.push({
          value: leaseCar['contract']['duration'].value,
          nowrap: {
            class: '',
            text: leaseCar['contract']['duration'].toDisplay as string,
          },
          component: TextNoWrapComponent
        });
      } else if (header.key == 'licensePlate') {
        rowData.tableData.push({
          value: leaseCar['licensePlate'].value,
          licensePlate: {
            country: 'NL',
            code: leaseCar['licensePlate'].toDisplay as string,
          },
          component: LicensePlateComponent
        });
      } else {
        rowData.tableData.push({
          //@ts-ignore
          value: leaseCar[header.key].value,
          nowrap: {
            class: '',
            // @ts-ignore
            text: leaseCar[header.key].toDisplay as string,
          },
          component: TextNoWrapComponent
        });
      }
    }

    rowData.tableData.push({ actions: { id: leaseCar['id'].value, apiURL: '/leasecars/', type: 'leasecars' }, component: ActionsComponent});
    rowData.tableData.push({ rotateArrow: { id: leaseCar['id'].toDisplay, class: 'trash-color pointer-hover rotate-to-0', title: 'open' }, component: RotateArrowComponent });

    this.rowData.push(rowData);
  }
}
