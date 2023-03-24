export interface Order {
  id?: number;
  supplier: string;
  orderer: string;
  leaseOrderStatus: string;
  orderDate: string;
  deliveryDate: string;
  weekOfDelivery: number;
  quotationPath: string;
  leasePlanPath: string;
}
