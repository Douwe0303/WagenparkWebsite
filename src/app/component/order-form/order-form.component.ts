import {Component, ViewChild} from '@angular/core';
import {OrderStatus} from "../../class/order-status/order-status";
import {OrderDummy} from "../../dummy/order-dummy/order-dummy";
import {NgForm} from "@angular/forms";
import {Order} from "../../interface/model/order";
import {Title} from "@angular/platform-browser";
import {EventService} from "../../service/event/event.service";
import {ActivatedRoute} from "@angular/router";
import {OrderTransformer} from "../../transformer/order-transformer/order-transformer";
import {OrderDto} from "../../interface/dto/order-dto";
import {first} from "rxjs";
import {OrderService} from "../../service/order/order.service";
import {EngineType} from "../../type/engine-type/engine-type";
import {ContractType} from "../../type/contract-type/contract-type";
import {LeasecarTransformer} from "../../transformer/leasecar-transformer/leasecar-transformer";
import {ContractTransformer} from "../../transformer/contract-transformer/contract-transformer";

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
  providers: [OrderTransformer, LeasecarTransformer, ContractTransformer]
})
export class OrderFormComponent {

  order: Order = JSON.parse(JSON.stringify(OrderDummy));

  protected readonly EngineType = EngineType;
  protected readonly ContractType = ContractType;
  protected readonly OrderStatus = OrderStatus;

  @ViewChild('leasecarForm') myForm: NgForm | undefined;

  busy: boolean = false;
  action: string | null = null;

  buttonFont: string = "add_button";
  buttonName: string = "Bestelling toevoegen";
  buttonColorClass: string = "text-success";

  constructor(
    private _orderService: OrderService,
    private _titleService: Title,
    private _eventService: EventService,
    private activatedRoute: ActivatedRoute,
    private orderTransformer: OrderTransformer
  ) {}

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.action = this.activatedRoute.snapshot.paramMap.get('action');

    if(id != null && this.action == 'edit') {
      this.getOrder(id);
      this._titleService.setTitle('Leaseauto ' + id);
      this.buttonFont = 'settings';
      this.buttonName = 'Leaseauto wijzigen';
      this.buttonColorClass = 'text-warning';
    }
  }

  getOrder(id: string): void {
    this._orderService.fetchOrder(+id).then((call: any) => {
      call.pipe(first()).subscribe((orderDto: OrderDto) => {
        this.order = this.orderTransformer.toModel(orderDto);
      })
    })
  }

  submit(): void {
    this.busy = true;
    let orderDto: OrderDto = this.orderTransformer.toDto(this.order);
    if(this.action == 'edit') {
      this.rotateIcon();
      this.timer().then(()=> {
        this.update(orderDto);
      })
    } else {
      this.loading();
      this.timer().then(()=> {
        this.create(orderDto);
      })
    }
  }

  async timer(): Promise<void> {
    await new Promise(f => setTimeout(f, 1000));
  }

  loading(): void {
    this.displayElement('form-button', 'none');
    this.displayElement('loading-spinner', 'flex');
  }

  finished(): void {
    this.displayElement('loading-spinner', 'none');
    this.displayElement('form-button', 'flex');
  }

  displayElement(element: string, display: string): void {
    // @ts-ignore
    document.getElementById(element).style.display = display;
  }

  rotateIcon(): void {
    let icon = document.getElementById('form-button-icon');
    // @ts-ignore
    icon.classList.add('rotate-icon');
  }

  removeRotation(): void {
    let icon = document.getElementById('form-button-icon');
    // @ts-ignore
    icon.classList.remove('rotate-icon');
  }

  update(orderDto: OrderDto): void {
    this._orderService.editOrder(orderDto).then((update) => {
      update.pipe(first()).subscribe(
        () => {
          this._eventService.emitUpdate(orderDto.id as number, 'Bestelling');
        },
        (error: any) => {
          alert(error.statusText)
        },
        () => {
          this.busy = false;
          this.removeRotation();
        }
      )
    })
  }

  create(orderDto: OrderDto): void {
    this._orderService.createOrder(orderDto).then((create) => {
      create.pipe(first()).subscribe(
        (order: OrderDto) => {
          this._eventService.emitAdd(order.id as number);
          this.myForm?.form.markAsPristine();
          this.order = JSON.parse(JSON.stringify(OrderDummy));
        },
        (error: any) => {
          alert(error.statusText)
        },
        () => {
          this.busy = false;
          this.finished();
        }
      )
    })
  }
}
