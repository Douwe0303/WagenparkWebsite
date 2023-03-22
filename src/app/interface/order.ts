export interface Order {
  id: number;
  supplier: string;
  orderer: string;
  leaseOrderStatus: string;
  orderDate: Date;
  deliveryDate: Date;
  weekOfDelivery: string;
  quotationPath: string;
  leasePlanPath: string;
}
