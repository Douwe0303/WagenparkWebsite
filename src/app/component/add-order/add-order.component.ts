import { Component, EventEmitter, Injectable, Output } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { OrderService } from "../../service/order.service";
import { Order } from "../../interface/order";
import { first } from "rxjs";

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
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class AddOrderComponent {

  constructor(private _orderService: OrderService) {}

  dateOfOrder: NgbDateStruct | undefined;
  dateOfDelivery: NgbDateStruct | undefined;

  orderer: string = "";
  driver: string = "";
  supplier: string = "";
  carBrand: string = "";
  status: string | undefined;
  expectedWeek: number = 0;
  leaseplanPath: string = "";
  quotationPath: string = "";

  @Output() newOrderEvent = new EventEmitter<Order>();

  async loading(): Promise<void> {
    await new Promise(f => setTimeout(f, 1000));
  }

  close(): void {
    // @ts-ignore
    document.getElementById('open-add-order').click();
  }

  create(): void {
    this.displayElement('add-order-button', 'none');
    this.displayElement('add-loading-spinner', 'flex');

    let order: Order | null = this.getOrder();

    this.loading().then(() => {
      this._orderService.createOrder(order).then((call) => {
        call.pipe(first()).subscribe((order: Order) => {
          this.newOrderEvent.emit(order);
          this.displayElement('add-loading-spinner', 'none');
          this.displayElement('add-order-button', 'flex');
          this.close();
        })
      })
    })
  }

  displayElement(element: string, display: string): void {
    // @ts-ignore
    document.getElementById(element).style.display = display;
  }

  getOrder(): Order | null {
    // @ts-ignore
    let orderDate = this.dateOfOrder.day + "-" + this.dateOfOrder.month + "-" + this.dateOfOrder.year;
    let deliveryDate = null;

    if(this.dateOfDelivery != null) {
      deliveryDate = this.dateOfDelivery.day + "-" + this.dateOfDelivery.month + "-" + this.dateOfDelivery.year;
    }

    return {
      supplier: this.supplier,
      orderer: this.orderer,
      //@ts-ignore
      leaseOrderStatus: this.status,
      orderDate: orderDate,
      deliveryDate: deliveryDate,
      weekOfDelivery: this.expectedWeek,
      quotationPath: this.quotationPath,
      leasePlanPath: this.leaseplanPath,
    }
  }
}
