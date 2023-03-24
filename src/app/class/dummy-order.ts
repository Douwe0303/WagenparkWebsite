import { Order } from "../interface/order";

export class DummyOrder implements Order {
  id: number = 0;
  supplier: string = "";
  orderer: string = "";
  leaseOrderStatus: string = "";
  orderDate: string = "";
  deliveryDate: string = "";
  weekOfDelivery: number = 0;
  quotationPath: string = "";
  leasePlanPath: string = "";
}
