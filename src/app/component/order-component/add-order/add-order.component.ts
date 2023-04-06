import { Component, EventEmitter, Injectable, Output } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { OrderService } from "../../../service/order/order.service";
import { OrderDto } from "../../../interface/dto/order-dto";
import { first } from "rxjs";
import { Order } from "../../../interface/model/order";
import { OrderTransformer } from "../../../class/transformer/order-transformer/order-transformer";
import { Leasecar } from "../../../interface/model/leasecar";
import { LeasecarTransformer } from "../../../class/transformer/leasecar-transformer/leasecar-transformer";
import { OrderStatus } from "../../../class/order-status/order-status";
import { FileService } from "../../../service/file/file.service";

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
    OrderTransformer,
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class AddOrderComponent {

  constructor(private _orderService: OrderService, private _fileService: FileService, private orderTransformer: OrderTransformer, private leasecarTransformer: LeasecarTransformer) {}

  protected readonly OrderStatus = OrderStatus;

  dateOfOrder: NgbDateStruct | undefined;
  dateOfDelivery: NgbDateStruct | undefined;

  orderer: string = "";
  driver: string = "";
  supplier: string = "";
  carBrand: string = "";
  status: string | undefined;
  expectedWeek?: number;

  leaseplanPath?: string;
  quotationPath?: string;

  leaseplan?: File;
  quotation?: File;

  carModel: string = "";
  carExtra: string = "";
  carEngine: string = "";
  carKilometers?: number;
  carPrice?: number;
  carParticularities: string = "";

  contractType?: string;
  signed: boolean = false;
  startDate?: NgbDateStruct;
  endDate?: NgbDateStruct;
  taxAddition?: number;
  contribution?: number;

  @Output() newOrderEvent = new EventEmitter<{order: Order, leasecar: Leasecar}>();

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

    let order: OrderDto | null = this.getOrder();

    this.loading().then(() => {
      this._orderService.createOrder(order).then((call) => {
        call.pipe(first()).subscribe(
          (orderDto: OrderDto) => {
            let leasecar: Leasecar = this.leasecarTransformer.toModel(orderDto.leaseCar);
            this.updateFilesAfterCreate(orderDto, leasecar);
          },
          (error: any) => {
            alert(error.statusText);
          },
          () => {
            this.displayElement('add-loading-spinner', 'none');
            this.displayElement('add-order-button', 'flex');
            this.close();
          })
      })
    })
  }

  updateFilesAfterCreate(orderDto: OrderDto, leasecar: Leasecar): void {
    let quotationPath: string | undefined = this.quotationPath?.replace('C:\\fakepath\\', '');
    let leaseplanPath: string | undefined = this.leaseplanPath?.replace('C:\\fakepath\\', '');

    let quotationName: string = "";
    let leaseplanName: string = "";

    if(quotationPath) {
      quotationName = quotationPath.substring(0, quotationPath.lastIndexOf('.')) + "_" + orderDto.id + quotationPath.substring(quotationPath.lastIndexOf('.'), quotationPath.length);
      orderDto.quotationPath = quotationName;
    }

    if(leaseplanPath) {
      leaseplanName = leaseplanPath.substring(0, leaseplanPath.lastIndexOf('.')) + "_" + orderDto.id + leaseplanPath.substring(leaseplanPath.lastIndexOf('.'), leaseplanPath.length);
      orderDto.leasePlanPath = leaseplanName;
    }

    this._orderService.editOrder(orderDto).then((call) => {
      call.pipe(first()).subscribe(() => {
        let order: Order = this.orderTransformer.toModel(orderDto);
        this.uploadFile(this.quotation, quotationName).then(() => {
          this.uploadFile(this.leaseplan, leaseplanName).then(() => {
            this.newOrderEvent.emit({order: order, leasecar: leasecar});
          });
        });
      })
    })
  }

  async uploadFile(file: File | undefined, name: string): Promise<any> {
    let formData: FormData = new FormData();
    if(file) {
      formData.append('file', file, name);
      this._fileService.uploadFile(formData).then((call) => {
        return call.pipe(first()).subscribe(() => {})
      });
    }
  }

  onFileSelect(fileEvent: any, fileName: string): void {
    if(fileName == 'leaseplan') {
      this.leaseplan = fileEvent.target.files[0];
    } else {
      this.quotation = fileEvent.target.files[0];
    }
  }

  displayElement(element: string, display: string): void {
    // @ts-ignore
    document.getElementById(element).style.display = display;
  }

  getDate(date: NgbDateStruct | undefined): string | undefined {
    if(date != null) {
      return date.day + "-" + date.month + "-" + date.year;
    } else {
      return undefined;
    }
  }

  getOrder(): OrderDto | null {

    let orderDate = this.getDate(this.dateOfOrder);
    let deliveryDate = this.getDate(this.dateOfDelivery);
    let startDate = this.getDate(this.startDate);
    let endDate = this.getDate(this.endDate);

    return {
      supplier: this.supplier,
      orderer: this.orderer,
      //@ts-ignore
      leaseOrderStatus: this.status,
      //@ts-ignore
      orderDate: orderDate,
      deliveryDate: deliveryDate,
      weekOfDelivery: this.expectedWeek,
      //@ts-ignore
      quotationPath: '',
      //@ts-ignore
      leasePlanPath: '',
      leaseCar: {
        brand: this.carBrand,
        driver: this.driver,
        model: this.carModel,
        extra: this.carExtra,
        engine: this.carEngine,
        kilometers: this.carKilometers,
        price: this.carPrice,
        particularities: this.carParticularities,
        contract: {
          contractType: this.contractType,
          signed: this.signed,
          startDate: startDate,
          endDate: endDate,
          taxAddition: this.taxAddition,
          contribution: this.contribution
        }
      }
    }
  }
}
