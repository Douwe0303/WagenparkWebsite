import { Order } from "../../interface/order";
import { OrderDto } from "../../interface/order-dto";
import { Transformer} from "../../interface/transformer";
import {OrderStatus} from "../order-status/order-status";

export class OrderTransformer implements Transformer<Order, OrderDto> {
  toModel(orderDto: OrderDto): Order {
    return {
      data: {
        id: {
          value: orderDto.id,
          translation: "id"
        },
        supplier: {
          value: orderDto.supplier,
          translation: "leverancier"
        },
        orderer: {
          value: orderDto.orderer,
          translation: "besteller"
        },
        leaseOrderStatus: {
          value: orderDto.leaseOrderStatus,
          translation: "status",
        },
        orderDate: {
          value: orderDto.orderDate,
          translation: "besteldatum"
        },
        deliveryDate: {
          value: orderDto.deliveryDate,
          translation: "leverdatum"
        },
        weekOfDelivery: {
          value: orderDto.weekOfDelivery,
          translation: "verwachte leverweek"
        },
        quotationPath: {
          value: orderDto.quotationPath,
          translation: "factuur"
        },
        leasePlanPath: {
          value: orderDto.leasePlanPath,
          translation: "lease plan"
        }
      }
    }
  }

  toDto(order: Order): OrderDto {
    return {
      id: 0,
      supplier: "",
      orderer: "",
      leaseOrderStatus: "",
      orderDate: "",
      deliveryDate: "",
      weekOfDelivery: 0,
      quotationPath: "",
      leasePlanPath: "",
      leaseCar: {
        id: 0,
        brand: "",
        driver: "",
        model: "",
        extra: "",
        engine: "",
        kilometers: 0,
        price: 0,
        particularities: ""
      }
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
