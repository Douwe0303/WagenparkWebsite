import { Component, EventEmitter, Injectable, Input, OnInit, Output, ViewChild } from '@angular/core';
import { OrderService } from "../../../service/order/order.service";
import { OrderDto } from "../../../interface/dto/order-dto";
import { first } from "rxjs";
import { OrderStatus } from "../../../class/order-status/order-status";
import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import {OrderTransformer} from "../../../transformer/order-transformer/order-transformer";
import {LeasecarTransformer} from "../../../transformer/leasecar-transformer/leasecar-transformer";
import {Order} from "../../../interface/model/order";
import {Leasecar} from "../../../interface/model/leasecar";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {OrderDummy} from "../../../dummy/order-dummy/order-dummy";
import {ContractTransformer} from "../../../transformer/contract-transformer/contract-transformer";
import {NgForm} from "@angular/forms";
import { EngineType } from "../../../type/engine-type/engine-type";
import { ContractType } from "../../../type/contract-type/contract-type";

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '-';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css'],
  providers: [
    OrderTransformer, LeasecarTransformer, ContractTransformer,
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter},
  ],
})
export class EditOrderComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private _orderService: OrderService,
    private orderTransformer: OrderTransformer,
    private leasecarTransformer: LeasecarTransformer
    ) {}

  ngOnInit(): void {
    if(this.myForm != undefined) {
      // @ts-ignore
      this.myForm.form.markAsPristine();
    }
  }

  protected readonly OrderStatus = OrderStatus;
  protected readonly EngineType = EngineType;
  protected readonly ContractType = ContractType;

  @Input() order: Order = OrderDummy;

  @Input() edit: boolean = false;
  @Input() buttonName: string = "";
  @Input() buttonFont: string = "";
  @Input() buttonColorClass: string = "";

  @Output() newOrderEvent = new EventEmitter<Order>();
  @Output() clickedEvent = new EventEmitter<string>;

  @ViewChild('addOrderForm') myForm: NgForm | undefined;

  leasePlan: string = "";
  quotation: string = "";
  busy: boolean = false;

  async loading(): Promise<void> {
    await new Promise(f => setTimeout(f, 1000));
  }

  clicked(value: any): void {
    this.clickedEvent.emit(value);
  }

  rotateIcon(): void {
    let icon = document.getElementById('add-order-icon');
    // @ts-ignore
    icon.classList.add('rotate-icon');
  }

  removeRotation(): void {
    let icon = document.getElementById('add-order-icon');
    // @ts-ignore
    icon.classList.remove('rotate-icon');
  }

  close(): void {
    // @ts-ignore
    document.getElementById('open-add').click();
  }

  create(): void {
    this.busy = true;

    if(this.edit) {
      this.rotateIcon();
    } else {
      this.displayElement('add-order-button', 'none');
      this.displayElement('add-loading-spinner', 'flex');
    }

    let orderDto: OrderDto | null = this.orderTransformer.toDto(this.order);

    this.loading().then(() => {
      this._orderService.createOrder(orderDto).then((call) => {
        call.pipe(first()).subscribe(
          (orderDto: OrderDto) => {
            let order: Order = this.orderTransformer.toModel(orderDto);
            this.newOrderEvent.emit(order);
            // @ts-ignore
            this.myForm.form.markAsPristine();
            if(!this.edit) {
              // @ts-ignore
              this.myForm.form.reset();
            }
          },
          (error: any) => {
            alert(error.statusText);
          },
          () => {
            if(!this.edit) {
              this.displayElement('add-loading-spinner', 'none');
              this.displayElement('add-order-button', 'flex');
              this.close();
            } else {
              this.removeRotation();
            }
            this.busy = false;
          })
      })
    })
  }

  displayElement(element: string, display: string): void {
    // @ts-ignore
    document.getElementById(element).style.display = display;
  }
}
