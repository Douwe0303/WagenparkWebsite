export interface Order {
  id?: number;
  supplier: string;
  orderer: string;
  leaseOrderStatus: string;
  orderDate: string;
  deliveryDate: string | null;
  weekOfDelivery: number | null;
  quotationPath: string | null;
  leasePlanPath: string | null;
}
