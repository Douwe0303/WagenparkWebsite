import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {OrderService} from "../../../service/order/order.service";
import {first, Observable} from "rxjs";
import {OrderDto} from "../../../interface/order-dto";
import {Sorting} from "../../../enum/sorting";
import {NgbDropdown} from "@ng-bootstrap/ng-bootstrap";
import {ToastOrderComponent} from "../../order-component/toast-order/toast-order.component";
import {OrderStatus} from "../../../class/order-status/order-status";
import {Order} from "../../../interface/order";
import {OrderTransformer} from "../../../class/transformer/order-transformer/order-transformer";
import {LeasecarTransformer} from "../../../class/transformer/leasecar-transformer/leasecar-transformer";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [OrderTransformer, LeasecarTransformer]
})
export class OrdersComponent implements OnInit {

  public orders: Order[] = [];

  public sorting: Sorting = Sorting.ASC;
  public sortingField: string = "id";
  public searchText: string = "";
  public reload: boolean = false;
  private opened: boolean = false;

  @ViewChild(NgbDropdown, { static: true })
  public dropdown: NgbDropdown | undefined;

  @ViewChild(ToastOrderComponent)
  public toastOrder: ToastOrderComponent = new ToastOrderComponent();

  public ORDERSTATUS = OrderStatus;

  constructor(private router: Router, private _orderService: OrderService, private orderTransformer: OrderTransformer) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  scroll(el: any) {
    if(!this.opened) {
      el.scrollIntoView()
    }
    this.opened = !this.opened;
  }

  fetchOrders(): void {
    this._orderService.fetchOrders().then((orders: Observable<any>) => {
      orders.pipe(first()).subscribe((orderDtos) => {
        this.convertDtos(orderDtos);
      });
    });
  }

  convertDtos(orderDtos: OrderDto[]): void {
    for(let dto of orderDtos) {
      let order: Order | undefined = this.orderTransformer.toModel(dto);
      this.orders.push(order);
    }
  }

  openStatusMenu(): void {
    this.dropdown?.open();
  }

  setSorting(field: string): void {

    let newId: string = 'sorting-'+field;
    let oldId: string = 'sorting-'+this.sortingField;

    // @ts-ignore
    let toSort: HTMLElement = document.getElementById('sorting-'+field);

    if(field != this.sortingField) {
      this.replaceClass(oldId, 'opacity-100', 'opacity-25');
      this.replaceClass(newId, 'opacity-25', 'opacity-100');
    }

    this.sortingField = field;

    if(toSort.classList.contains('rotate-to-180')) {
      this.sorting = Sorting.ASC;
      this.replaceClass(newId, 'rotate-to-180', 'rotate-to-0');
    } else {
      this.sorting = Sorting.DESC;
      this.replaceClass(newId, 'rotate-to-0', 'rotate-to-180');
    }
  }

  rotateArrow(id: number | undefined): void {

    // @ts-ignore
   let expanded: string = document.getElementById('row'+id).getAttribute('aria-expanded');

    // @ts-ignore
    let arrow: HTMLElement = document.getElementById('arrow'+id);

    if(expanded == 'true') {
      arrow.classList.replace('rotate-to-0', 'rotate-to-180');
      arrow.title = 'Sluit';
    }
    else if(expanded == 'false') {
      arrow.classList.replace('rotate-to-180', 'rotate-to-0');
      arrow.title = 'Open';
    }
  }

  delete(id: number | undefined): void {
    this._orderService.deleteOrder(id).then((call) => {
      call.pipe(first()).subscribe(() => {
        // @ts-ignore
        this.orders = this.orders.filter(order => order.data.id.value !== id);
      })
      //TODO: catch error and show error to client
    }).catch((error) => {
      console.log(error);
    })
  }

  addOrder(data: any): void {
    this.orders.push(data.order);
  }

  replaceClass(id: string, oldClass: string, newClass: string): void {
    document.getElementById(id)?.classList.replace(oldClass, newClass);
  }

  editStatus(id: number, status: any): void {
    let index: number = this.orders.findIndex(order => order.data.id.value == id);
    let order: Order = this.orders[index];

    let oldStatus: string = order.data.leaseOrderStatus.value;
    let oldData: any = order.data.leaseOrderStatus.data;
    let newStatus: string = status.code;

    if(oldStatus == newStatus) {
      return;
    }

    order.data.leaseOrderStatus.value = newStatus;
    order.data.leaseOrderStatus.data = status;

    let orderDto: OrderDto = this.orderTransformer?.toDto(order);

    this._orderService.editOrder(orderDto).then(r => r.pipe(first()).subscribe(
      {
        error: (error: any) => {
          console.log(error.statusText);
          alert(error);
        },
        complete: () => {
          // @ts-ignore
          this.toastOrder.showToast('Bestelstatus gewijzigd!', id, 'De status van de bestelling is gewijzigd.', 'orange');
          this.replaceClass('status'+id, 'btn-'+oldData.color, 'btn-'+status.color);
        }
      }));
  }

  reloadOrders(): void {
    this.reload = !this.reload;
  }

  prompt(show: boolean, id: number | undefined): void {
    if(show) {
      // @ts-ignore
      document.getElementById('actions_'+id).style.display = 'none';

      // @ts-ignore
      document.getElementById('delete_prompt_'+id).style.display = 'flex';
    } else {
      // @ts-ignore
      document.getElementById('delete_prompt_'+id).style.display = 'none';

      // @ts-ignore
      document.getElementById('actions_'+id).style.display = 'flex';
    }
  }
}
