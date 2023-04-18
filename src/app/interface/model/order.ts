import { Leasecar } from "./leasecar";
import { Data } from "./data";

export interface Order {
  data: {
    id: Data<number | undefined>,
    orderer: Data<string>
    supplier: Data<string>
    leaseOrderStatus: Data<string>
    orderDate: Data<string>
    deliveryDate: Data<string | undefined>
    weekOfDelivery: Data<number | undefined>
    leasecar: Leasecar
  }
}
