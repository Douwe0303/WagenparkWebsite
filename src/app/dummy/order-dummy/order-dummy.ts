import { Order } from "../../interface/model/order";
import { OrderStatus } from "../../class/order-status/order-status";
import { LeasecarDummy } from "../leasecar-dummy/leasecar-dummy";

export const OrderDummy: Order = {
    id: {
      value: 0,
      type: 'number',
      required: true,
      toDisplay: "",
      translation: "id"
    },
    supplier: {
      value: "",
      type: 'string',
      required: true,
      toDisplay: "",
      translation: "leverancier"
    },
    orderer: {
      value: "",
      type: 'string',
      required: true,
      toDisplay: "",
      translation: "besteller"
    },
    leaseOrderStatus: {
      value: "",
      toDisplay: "",
      type: 'string',
      required: true,
      // data: OrderStatus.unknown,
      translation: "status",
    },
    orderDate: {
      value: "",
      type: 'string',
      required: true,
      toDisplay: "",
      translation: "besteldatum"
    },
    deliveryDate: {
      value: "",
      type: 'string',
      required: true,
      toDisplay: "",
      translation: "leverdatum"
    },
    weekOfDelivery: {
      value: 0,
      type: 'string',
      required: true,
      toDisplay: "",
      translation: "verwachte leverweek"
    },
    leasecar: LeasecarDummy
}
