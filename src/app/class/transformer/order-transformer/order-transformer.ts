import { Order } from "../../../interface/order";
import { OrderDto } from "../../../interface/order-dto";
import { Transformer} from "../../../interface/transformer";
import { OrderStatus } from "../../order-status/order-status";
import { Injectable } from "@angular/core";

@Injectable()
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
          data: this.getOrderStatus(orderDto.leaseOrderStatus),
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
        },
        leasecar: {
          data: {
            id: {
              value: orderDto.leaseCar.id,
              translation: "id"
            },
            brand: {
              value: orderDto.leaseCar.brand,
              translation: "automerk"
            },
            driver: {
              value: orderDto.leaseCar.driver,
              translation: "bestuurder"
            },
            model: {
              value: orderDto.leaseCar.model,
              translation: "model"
            },
            extra: {
              value: orderDto.leaseCar.extra,
              translation: "extra/kleur"
            },
            engine: {
              value: orderDto.leaseCar.engine,
              translation: "motor"
            },
            kilometers: {
              value: orderDto.leaseCar.kilometers,
              translation: "kilometrage"
            },
            price: {
              value: orderDto.leaseCar.price,
              translation: "fiscale waarde"
            },
            particularities: {
              value: orderDto.leaseCar.particularities,
              translation: "bijzonderheden"
            }
          }
        }
      }
    }
  }

  toDto(order: Order): OrderDto {
    return {
      id: order.data.id.value,
      supplier: order.data.supplier.value,
      orderer: order.data.orderer.value,
      leaseOrderStatus: order.data.leaseOrderStatus.value,
      orderDate: order.data.orderDate.value,
      deliveryDate: order.data.deliveryDate.value,
      weekOfDelivery: order.data.weekOfDelivery.value,
      quotationPath: order.data.quotationPath.value,
      leasePlanPath: order.data.leasePlanPath.value,
      leaseCar: {
        id: order.data.leasecar.data.id.value,
        brand: order.data.leasecar.data.brand.value,
        driver: order.data.leasecar.data.driver.value,
        model: order.data.leasecar.data.model.value,
        extra: order.data.leasecar.data.extra.value,
        engine: order.data.leasecar.data.engine.value,
        kilometers: order.data.leasecar.data.kilometers.value,
        price: order.data.leasecar.data.price.value,
        particularities: order.data.leasecar.data.particularities.value
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
