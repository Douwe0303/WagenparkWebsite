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
  leaseCar: any =
    {
      id: 0,
      brand: "",
      driver: "",
      model: "",
      extra: "",
      engine: "",
      kilometers: 0,
      price: 0.00,
      particularities: ""
  }
}
