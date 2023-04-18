import { Order } from "../../interface/model/order";
import { OrderStatus } from "../../class/order-status/order-status";
import { LeasecarDummy } from "../leasecar-dummy/leasecar-dummy";

export class OrderDummy implements Order {
  data: any = {
    id: {
      value: 0,
      toDisplay: "",
      translation: "id"
    },
    supplier: {
      value: "",
      toDisplay: "",
      translation: "leverancier"
    },
    orderer: {
      value: "",
      toDisplay: "",
      translation: "besteller"
    },
    leaseOrderStatus: {
      value: "",
      toDisplay: "",
      data: OrderStatus.unknown,
      translation: "status",
    },
    orderDate: {
      value: "",
      toDisplay: "",
      translation: "besteldatum"
    },
    deliveryDate: {
      value: "",
      toDisplay: "",
      translation: "leverdatum"
    },
    weekOfDelivery: {
      value: 0,
      toDisplay: "",
      translation: "verwachte leverweek"
    },
    leasecar: new LeasecarDummy()
  }
}
