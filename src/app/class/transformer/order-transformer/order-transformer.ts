import { Order } from "../../../interface/model/order";
import { OrderDto } from "../../../interface/dto/order-dto";
import { Transformer} from "../../../interface/transformer";
import { OrderStatus } from "../../order-status/order-status";
import { Injectable } from "@angular/core";
import { LeasecarTransformer } from "../leasecar-transformer/leasecar-transformer";
import { Leasecar } from "../../../interface/model/leasecar";
import { LeasecarDto } from "../../../interface/dto/leasecar-dto";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { CustomDateParser } from "../../customDateParser/custom-date-parser";

@Injectable()
export class OrderTransformer implements Transformer<Order, OrderDto> {

  constructor(private leasecarTransformer: LeasecarTransformer, private customDateParser: CustomDateParser) {}

  toModel(orderDto: OrderDto): Order {
    let status: any = this.getOrderStatus(orderDto.leaseOrderStatus);

    let leasecar: Leasecar = this.leasecarTransformer.toModel(orderDto.leaseCar);

    return {
      data: {
        id: {
          value: orderDto.id,
          type: 'number',
          toDisplay: orderDto.id+'',
          required: true,
          translation: "id"
        },
        orderer: {
          value: orderDto.orderer,
          type: 'text',
          required: true,
          toDisplay: orderDto.orderer,
          translation: "Besteller"
        },
        supplier: {
          value: orderDto.supplier,
          type: 'text',
          required: true,
          toDisplay: orderDto.supplier,
          translation: "Leverancier"
        },
        leaseOrderStatus: {
          value: status.code,
          type: 'text',
          required: true,
          toDisplay: status.text,
          status: status,
          translation: "Status",
        },
        orderDate: {
          value: orderDto.orderDate,
          type: 'date',
          required: true,
          date: this.customDateParser.parse(orderDto.orderDate),
          toDisplay: orderDto.orderDate,
          translation: "Besteldatum"
        },
        deliveryDate: {
          value: orderDto.deliveryDate,
          type: 'date',
          required: true,
          date: orderDto.deliveryDate == undefined ? undefined : this.customDateParser.parse(orderDto.deliveryDate),
          toDisplay: orderDto.deliveryDate == null ? '' : orderDto.deliveryDate,
          translation: "Leverdatum"
        },
        weekOfDelivery: {
          value: orderDto.weekOfDelivery,
          type: 'number',
          required: false,
          toDisplay: orderDto.weekOfDelivery+'',
          translation: "Verwachte leverweek"
        },
        quotationPath: {
          value: orderDto.quotationPath,
          type: 'text',
          required: false,
          toDisplay: this.getLink(orderDto.quotationPath),
          path: orderDto.quotationPath,
          translation: "Factuur"
        },
        leasePlanPath: {
          value: orderDto.leasePlanPath,
          type: 'text',
          required: false,
          toDisplay: this.getLink(orderDto.leasePlanPath),
          path: orderDto.leasePlanPath,
          translation: "Lease plan"
        },
        leasecar: leasecar
      }
    }
  }

  toDto(order: Order): OrderDto {
    let leasecarDto: LeasecarDto = this.leasecarTransformer.toDto(order.data.leasecar);

    return {
      id: order.data.id.value,
      supplier: order.data.supplier.value,
      orderer: order.data.orderer.value,
      leaseOrderStatus: order.data.leaseOrderStatus.value,
      //@ts-ignore
      orderDate: this.getDate(order.data.orderDate.date),
      deliveryDate: this.getDate(order.data.deliveryDate.date),
      weekOfDelivery: order.data.weekOfDelivery.value,
      quotationPath: order.data.quotationPath.value,
      leasePlanPath: order.data.leasePlanPath.value,
      leaseCar: leasecarDto
    }
  }

  getLink(link: string | undefined): string {
    if(link && (link != '')) {
      return this.getFileType(link);
    } else {
      return 'Document ontbreekt';
    }
  }

  getFileType(fileName: string): string {
    let type: string = fileName.substring(fileName.lastIndexOf('.')+1, fileName.length);
    if(type == 'doc' || type == 'docx') {
      return 'Download Word-bestand';
    } else if(type == 'pdf') {
      return 'Open pdf-bestand';
    } else {
      return 'Open bestand';
    }
  }

  getOrderStatus(status: string): any {
    switch(status) {
      case OrderStatus.ordered.code:
        return OrderStatus.ordered;

      case OrderStatus.delivered.code:
        return OrderStatus.delivered;

      case OrderStatus.delayed.code:
        return OrderStatus.delayed;

      case OrderStatus.shipped.code:
        return OrderStatus.shipped;

      case OrderStatus.unknown.code:
        return OrderStatus.unknown;

      case OrderStatus.canceled.code:
        return OrderStatus.canceled;

      case OrderStatus.processed.code:
        return OrderStatus.processed;
    }
  }

  getDate(date: NgbDateStruct | undefined | null): string | undefined {
    if(date != null) {
      return date.day + "-" + date.month + "-" + date.year;
    } else {
      return "";
    }
  }
}
