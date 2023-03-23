import { Order } from "../interface/order";

export class DummyOrder implements Order {
  id: number = 0;
  supplier: string = "";
  orderer: string = "";
  leaseOrderStatus: string = "";
  orderDate: Date = new Date();
  deliveryDate: Date = new Date();
  weekOfDelivery: string = "";
  quotationPath: string = "";
  leasePlanPath: string = "";
}
