import { Order } from "../../interface/model/order";
import { LeasecarDummy } from "../leasecar-dummy/leasecar-dummy";
import {OrderStatus} from "../../class/order-status/order-status";

export const OrderDummy: Order = {
    id: {
      value: undefined,
      type: 'number',
      required: true,
      toDisplay: "",
      translation: "id"
    },
    supplier: {
      value: "LeasePlan",
      type: 'text',
      required: true,
      toDisplay: "LeasePlan",
      translation: "Leverancier"
    },
    orderer: {
      value: "",
      type: 'text',
      required: true,
      toDisplay: "",
      translation: "Besteller"
    },
    leaseOrderStatus: {
      value: "ORDERED",
      toDisplay: "Besteld",
      type: 'text',
      required: true,
      status: OrderStatus.ordered,
      translation: "Status",
    },
    orderDate: {
      value: "",
      type: 'date',
      required: true,
      date: null,
      toDisplay: "",
      translation: "Besteldatum"
    },
    deliveryDate: {
      value: "",
      type: 'date',
      required: true,
      date: null,
      toDisplay: "",
      translation: "Leverdatum"
    },
    weekOfDelivery: {
      value: 0,
      type: 'number',
      required: false,
      toDisplay: "0",
      translation: "Verwachte leverweek"
    },
    leasecar: { ...LeasecarDummy }
}
