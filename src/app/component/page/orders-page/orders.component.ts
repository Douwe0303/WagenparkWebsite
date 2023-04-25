import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { OrderService } from "../../../service/order/order.service";
import {first, Subscription} from "rxjs";
import { OrderDto } from "../../../interface/dto/order-dto";
import { NgbDropdown} from "@ng-bootstrap/ng-bootstrap";
import { ToastComponent } from "../../toast/toast.component";
import { Order } from "../../../interface/model/order";
import { OrderTransformer } from "../../../transformer/order-transformer/order-transformer";
import { LeasecarTransformer } from "../../../transformer/leasecar-transformer/leasecar-transformer";
import { ContractTransformer } from "../../../transformer/contract-transformer/contract-transformer";
import { DatePipe } from "@angular/common";
import { Title } from "@angular/platform-browser";
import { OrderTableHeader } from "../../../class/order-table-header/order-table-header";
import { RowData } from "../../../interface/row-data";
import { EventService } from "../../../service/event/event.service";
import { SortingType } from "../../../enum/sorting-type";
import { TextNoWrapComponent } from "../../table-component/table-data-items/text-no-wrap/text-no-wrap.component";
import { ActionsComponent } from "../../table-component/table-data-items/actions/actions.component";
import { RotateArrowComponent } from "../../table-component/table-data-items/rotate-arrow/rotate-arrow.component";
import { OrderStatus } from "../../../class/order-status/order-status";
import { DropdownComponent } from "../../table-component/table-data-items/dropdown/dropdown.component";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [OrderTransformer, LeasecarTransformer, ContractTransformer, DatePipe]
})
export class OrdersComponent implements OnInit, OnDestroy {

  protected readonly OrderTableHeader = OrderTableHeader;

  rowData: RowData[] = [];
  filteredRowData: RowData[] = [];

  @ViewChild(NgbDropdown, { static: true })
  public dropdown: NgbDropdown | undefined;

  @ViewChild(ToastComponent)
  public toast: ToastComponent = new ToastComponent();

  deleteSubscription: Subscription = new Subscription();
  addSubscription: Subscription = new Subscription();
  searchSubscription: Subscription = new Subscription();
  statusSubscription: Subscription = new Subscription();

  constructor(
    private _orderService: OrderService,
    private _eventService: EventService,
    private orderTransformer: OrderTransformer,
    private _titleService: Title,
  ) {}

  ngOnDestroy(): void {
    this.deleteSubscription.unsubscribe();
    this.addSubscription.unsubscribe();
    this.searchSubscription.unsubscribe();
    this.statusSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.fetchOrders();
    this._titleService.setTitle("Bestellingen");
    this.sortEvent();
    this.deleteSubscription = this._eventService.deleteEvent.subscribe(deleteEvent => {
      if(deleteEvent.type == 'orders') {
        this.delete(deleteEvent.id);
      }
    })
    this.searchSubscription = this._eventService.searchEvent.subscribe(text => {
      this.filteredRowData = this.rowData.filter(row => row.tableData[2].value.toLowerCase().includes(text.toLowerCase()));
    })
    this.addSubscription = this._eventService.addEvent.subscribe(id => {
      this.add(id);
    })
    this.statusSubscription = this._eventService.statusEvent.subscribe(status => {
      this.updateStatus(status.status, status.id);
    })
  }

  updateStatus(status: string, id: number): void {
    let index = this.rowData.findIndex(data => data.id == id);
    let order = this.rowData[index].data[0];
    let old = { ...order};
    order.leaseOrderStatus.value = status;
    //@ts-ignore
    order.leaseOrderStatus.toDisplay = OrderStatus[status.toLowerCase()].text;
    let orderDto = this.orderTransformer.toDto(order);
    this._orderService.editOrder(orderDto).then((update) => {
      update.pipe(first()).subscribe(
        () => {
          this.toast.showToast('Bestelstatus gewijzigd!', id, 'De status van de bestelling is gewijzigd.', 'orange');
          let rowData = this.rowData[index];
          //@ts-ignore
          rowData.tableData[4].value = OrderStatus[status.toLowerCase()].value;
          //@ts-ignore
          rowData.tableData[4].dropdown.text = OrderStatus[status.toLowerCase()].text;
          //@ts-ignore
          rowData.tableData[4].dropdown.color = OrderStatus[status.toLowerCase()].color;
        },
        (error: any) => {
          this.rowData[index].data[0] = old;
          alert(error);
        }
      )
    })
  }

  delete(id: number): void {
    this._orderService.deleteOrder(id).then((call) => {
      call.pipe(first()).subscribe(
        () => {
          this.toast.showToast('Bestelling verwijderd!', id, 'De bestelling is verwijderd.', 'red');
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

  sortEvent(): void {
    this._eventService.sortingEvent.subscribe(data => {
      this.filteredRowData = this.filteredRowData.sort((a: any, b: any) => {
        const valueA = a.tableData[data.index].value;
        const valueB = b.tableData[data.index].value;
        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return data.sorting == SortingType.ASC ? valueA - valueB : valueB - valueA;
        } else {
          const stringA = valueA.toString();
          const stringB = valueB.toString();
          return data.sorting == SortingType.ASC ? stringA.localeCompare(stringB) : stringB.localeCompare(stringA);
        }
      })
    })
  }

  fetchOrders(): void {
    this._orderService.fetchOrders().then(orders =>
      orders.pipe(first()).subscribe(
        (orderDtos: OrderDto[]) => this.convertDtos(orderDtos),
        (error: any) => alert(error.statusText)
      )
    );
  };

  convertDtos(orderDtos: OrderDto[]): void {
    for(let dto of orderDtos) {
      let order: Order | undefined = this.orderTransformer.toModel(dto);
      this.addRowData(order);
    }
    this.filteredRowData = this.rowData;
  }

  addRowData(order: Order): void {
    let rowData: RowData = {
      id: order.id.value as number,
      tableData: [],
      data: [order, order.leasecar, order.leasecar.contract]
    }

    for(let header of OrderTableHeader) {
      if(header.key == 'driver') {
        rowData.tableData.push({
          value: order['leasecar']['driver'].value,
          nowrap: {
            class: '',
            text: order['leasecar']['driver'].toDisplay
          },
          component: TextNoWrapComponent
        })
      }
      else if(header.key == 'leaseOrderStatus') {
        rowData.tableData.push({
          value: order['leaseOrderStatus'].value,
          dropdown: {
            id: order['id'].value,
            text: order['leaseOrderStatus'].status.text,
            color: order['leaseOrderStatus'].status.color,
            items: OrderStatus
          },
          component: DropdownComponent
        })
      }
      else {
        rowData.tableData.push({
          //@ts-ignore
          value: order[header.key].value,
          nowrap: {
            class: '',
            // @ts-ignore
            text: order[header.key].toDisplay as string
          },
          component: TextNoWrapComponent
        });
      }
    }
    rowData.tableData.push({ actions: { id: order['id'].value, apiURL: '/orders/', type: 'orders' }, component: ActionsComponent});
    rowData.tableData.push({ rotateArrow: { id: order['id'].toDisplay, class: 'trash-color pointer-hover rotate-to-0', title: 'open' }, component: RotateArrowComponent });

    this.rowData.push(rowData);
  }

  add(id: number): void {
    this._orderService.fetchOrder(id).then((get) => {
      get.pipe(first()).subscribe(
        (orderDto: OrderDto) => {
          let order: Order = this.orderTransformer.toModel(orderDto);
          this.addRowData(order);
          this.toast.showToast('Bestelling toegevoegd!', orderDto.id, 'De bestelling is toegevoegd', 'green');
          // @ts-ignore
          document.getElementById('open-add').click();
        }
      )
    })
  }
}
