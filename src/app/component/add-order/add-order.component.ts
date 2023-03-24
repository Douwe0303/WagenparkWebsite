import {Component, EventEmitter, Injectable, Output} from '@angular/core';
import {NgbDateParserFormatter, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {OrderService} from "../../service/order.service";
import {Order} from "../../interface/order";
import {DatePipe} from "@angular/common";

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/';

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
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class AddOrderComponent {

  constructor(private _orderService: OrderService, private datePipe: DatePipe) {}

  dateOfOrder: NgbDateStruct | undefined;
  dateOfDelivery: NgbDateStruct | undefined;

  orderer: string = "";
  driver: string = "";
  supplier: string = "";
  carBrand: string = "";
  status: string = "Status";
  expectedWeek: number = 0;
  leaseplanPath: string = "";
  quotationPath: string = "";

  @Output() newOrderEvent = new EventEmitter<Order>();

  create(): void {
    let order: Order | null = this.getOrder();

    if(!order) {
      return;
    }

    this._orderService.createOrder(order).then((call) => {
      call.subscribe((order: Order) => {
        this.newOrderEvent.emit(order);
      })
    })
  }

  getOrder(): Order | null {
    if(!this.dateOfOrder || !this.dateOfDelivery) {
      return null;
    }

    let orderDate = this.dateOfOrder.day + "-" + this.dateOfOrder.month + "-" + this.dateOfOrder.year;
    let deliveryDate = this.dateOfDelivery.day + "-" + this.dateOfDelivery.month + "-" + this.dateOfDelivery.year;

    return {
      supplier: this.supplier,
      orderer: this.orderer,
      leaseOrderStatus: this.status,
      orderDate: orderDate,
      deliveryDate: deliveryDate,
      weekOfDelivery: this.expectedWeek,
      quotationPath: this.quotationPath,
      leasePlanPath: this.leaseplanPath,
    }
  }
}
