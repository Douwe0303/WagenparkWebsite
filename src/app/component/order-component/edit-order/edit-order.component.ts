import {Component, EventEmitter, Injectable, Input, Output} from '@angular/core';
import {OrderService} from "../../../service/order/order.service";
import {OrderDto} from "../../../interface/dto/order-dto";
import {first} from "rxjs";
import {OrderStatus} from "../../../class/order-status/order-status";
import {NgbDateParserFormatter, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {OrderTransformer} from "../../../class/transformer/order-transformer/order-transformer";
import {FileService} from "../../../service/file/file.service";
import {LeasecarTransformer} from "../../../class/transformer/leasecar-transformer/leasecar-transformer";
import {Order} from "../../../interface/model/order";
import {Leasecar} from "../../../interface/model/leasecar";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {OrderDummy} from "../../../class/dummy/order-dummy/order-dummy";
import {ContractTransformer} from "../../../class/transformer/contract-transformer/contract-transformer";

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
export class EditOrderComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private _orderService: OrderService,
    private _fileService: FileService,
    private orderTransformer: OrderTransformer,
    private leasecarTransformer: LeasecarTransformer) {
  }

  protected readonly OrderStatus = OrderStatus;

  @Input() order: Order = new OrderDummy();

  @Output() newOrderEvent = new EventEmitter<{order: Order, leasecar: Leasecar}>();

  async loading(): Promise<void> {
    await new Promise(f => setTimeout(f, 1000));
  }

  initFiles(path: string | undefined): void {
    let extension: string;
    let fileName: string;
    if(path) {
      extension = this.getExtension(path);
      fileName = this.initFileName(path, '_leaseplan_', this.order.data.id.value);
      this.setFile(extension, fileName);
    }
  }

  setFile(fileName: string, extension: string): void {
    this._fileService.getFile(fileName, extension).then((call) => {
      call.pipe(first()).subscribe((file: File) => {
        this.order.data.leasePlanPath.file = file;
      })
    })
  }

  close(): void {
    // @ts-ignore
    document.getElementById('open-add-order').click();
  }

  create(): void {
    this.displayElement('add-order-button', 'none');
    this.displayElement('add-loading-spinner', 'flex');

    let order: OrderDto | null = this.orderTransformer.toDto(this.order);

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

  getExtension(file: string): string {
    return file.substring(file.lastIndexOf('.'), file.length);
  }

  getFileName(path: string): string {
    return path.substring(0, path.lastIndexOf('.'));
  }

  removeFakePath(path: string): string {
    return path.replace('C:\\fakepath\\', '');
  }

  initFileName(path: string, suffix: string, id: number | undefined): string {
    return this.getFileName(path) + suffix + id + this.getExtension(path);
  }

  updateFilesAfterCreate(orderDto: OrderDto, leasecar: Leasecar): void {
    // @ts-ignore
    let quotationPath: string | undefined = this.removeFakePath(this.order.data.quotationPath.value);
    // @ts-ignore
    let leaseplanPath: string | undefined = this.removeFakePath(this.order.data.leasePlanPath.value);

    let quotationName: string = "";
    let leaseplanName: string = "";

    if(quotationPath) {
      quotationName = this.initFileName(quotationPath, "_factuur_", orderDto.id);
      orderDto.quotationPath = quotationName;
    }

    if(leaseplanPath) {
      leaseplanName = this.initFileName(leaseplanPath, "_leaseplan_", orderDto.id);
      orderDto.leasePlanPath = leaseplanName;
    }

    this._orderService.editOrder(orderDto).then((call) => {
      call.pipe(first()).subscribe(() => {
        let order: Order = this.orderTransformer.toModel(orderDto);
        this.uploadFile(this.order.data.quotationPath.file, quotationName).then(() => {
          this.uploadFile(this.order.data.leasePlanPath.file, leaseplanName).then(() => {
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
        return call.pipe(first()).subscribe();
      });
    }
  }

  onFileSelect(fileEvent: any, fileName: string): void {
    if(fileName == 'leaseplan') {
      this.order.data.leasePlanPath.file = fileEvent.target.files[0];
    } else {
      this.order.data.quotationPath.file = fileEvent.target.files[0];
    }
  }

  displayElement(element: string, display: string): void {
    // @ts-ignore
    document.getElementById(element).style.display = display;
  }
}
