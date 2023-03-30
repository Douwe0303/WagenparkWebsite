import { Order } from "../../../interface/order";

export class OrderDummy implements Order {
  data: any = {
    id: {
      value: 0,
      translation: "id"
    },
    supplier: {
      value: "",
      translation: "leverancier"
    },
    orderer: {
      value: "",
      translation: "besteller"
    },
    leaseOrderStatus: {
      value: "",
      translation: "status",
    },
    orderDate: {
      value: "",
      translation: "besteldatum"
    },
    deliveryDate: {
      value: "",
      translation: "leverdatum"
    },
    weekOfDelivery: {
      value: 0,
      translation: "verwachte leverweek"
    },
    quotationPath: {
      value: "",
      translation: "factuur"
    },
    leasePlanPath: {
      value: "",
      translation: "lease plan"
    }
  }
}
