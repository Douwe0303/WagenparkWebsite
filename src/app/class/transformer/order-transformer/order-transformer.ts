import { Order } from "../../../interface/model/order";
import { OrderDto } from "../../../interface/dto/order-dto";
import { Transformer} from "../../../interface/transformer";
import { OrderStatus } from "../../order-status/order-status";
import { Injectable } from "@angular/core";
import { LeasecarTransformer } from "../leasecar-transformer/leasecar-transformer";
import { Leasecar } from "../../../interface/model/leasecar";
import { LeasecarDto } from "../../../interface/dto/leasecar-dto";

@Injectable()
export class OrderTransformer implements Transformer<Order, OrderDto> {

  constructor(private leasecarTransformer: LeasecarTransformer) {}

  toModel(orderDto: OrderDto): Order {
    let status: any = this.getOrderStatus(orderDto.leaseOrderStatus);

    let leasecar: Leasecar = this.leasecarTransformer.toModel(orderDto.leaseCar);

    return {
      data: {
        id: {
          value: orderDto.id,
          translation: "id"
        },
        orderer: {
          value: orderDto.orderer,
          translation: "Besteller"
        },
        supplier: {
          value: orderDto.supplier,
          translation: "Leverancier"
        },
        leaseOrderStatus: {
          value: status.text,
          data: status,
          translation: "Status",
        },
        orderDate: {
          value: orderDto.orderDate,
          translation: "Besteldatum"
        },
        deliveryDate: {
          value: orderDto.deliveryDate,
          translation: "Leverdatum"
        },
        weekOfDelivery: {
          value: orderDto.weekOfDelivery,
          translation: "Verwachte leverweek"
        },
        quotationPath: {
          value: '<a href=' + orderDto.quotationPath + '> test </a>',
          translation: "Factuur"
        },
        leasePlanPath: {
          value: orderDto.leasePlanPath,
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
      leaseOrderStatus: order.data.leaseOrderStatus.data.code,
      orderDate: order.data.orderDate.value,
      deliveryDate: order.data.deliveryDate.value,
      weekOfDelivery: order.data.weekOfDelivery.value,
      quotationPath: order.data.quotationPath.value,
      leasePlanPath: order.data.leasePlanPath.value,
      leaseCar: leasecarDto
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
}
