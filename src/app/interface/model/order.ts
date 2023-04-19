import { Leasecar } from "./leasecar";
import { Data } from "../data";

export interface Order {
  id: Data
  orderer: Data
  supplier: Data
  leaseOrderStatus: Data
  orderDate: Data
  deliveryDate: Data
  weekOfDelivery: Data
  leasecar: Leasecar
}
