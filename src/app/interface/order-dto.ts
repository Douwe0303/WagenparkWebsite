export interface OrderDto {
  id?: number;
  supplier: string;
  orderer: string;
  leaseOrderStatus: string;
  orderDate: string;
  deliveryDate?: string;
  weekOfDelivery?: number;
  quotationPath?: string;
  leasePlanPath?: string;
  leaseCar: {
    id?: number,
    brand?: string,
    driver?: string,
    model?: string,
    extra?: string,
    engine?: string,
    kilometers?: number,
    price?: number,
    particularities?: string
  }
}
