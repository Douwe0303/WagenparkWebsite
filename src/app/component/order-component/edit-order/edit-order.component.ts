import {Component, EventEmitter, Injectable, Input, OnInit, Output, ViewChild} from '@angular/core';
import { OrderService } from "../../../service/order/order.service";
import { OrderDto } from "../../../interface/dto/order-dto";
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
import {NgForm} from "@angular/forms";
import { EngineType } from "../../../class/engine-type/engine-type";
import {ContractType} from "../../../class/contract-type/contract-type";

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
    private _fileService: FileService,
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

  @Input() order: Order = new OrderDummy();

  @Input() edit: boolean = false;
  @Input() buttonName: string = "";
  @Input() buttonFont: string = "";
  @Input() buttonColorClass: string = "";

  @Output() newOrderEvent = new EventEmitter<{order: Order, leasecar: Leasecar}>();
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
            let leasecar: Leasecar = this.leasecarTransformer.toModel(orderDto.leaseCar);
            // @ts-ignore
            this.myForm.form.markAsPristine();
            this.updateFilesAfterCreate(orderDto, leasecar);
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
    let quotationPath: string | undefined = this.removeFakePath(this.quotation);
    // @ts-ignore
    let leaseplanPath: string | undefined = this.removeFakePath(this.leasePlan);

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
          this.quotation = "";
          this.uploadFile(this.order.data.leasePlanPath.file, leaseplanName).then(() => {
            if(!this.edit) {
              // @ts-ignore
              this.order = new OrderDummy();
            } else {
              this.order = order;
            }
            this.leasePlan = "";
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

  protected readonly ContractType = ContractType;
}
