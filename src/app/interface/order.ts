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
  leaseCar: {
    id?: number,
    brand: string | null,
    driver: string | null,
    model: string | null,
    extra: string | null,
    engine: string | null,
    kilometers: number | null,
    price: number | null,
    particularities: string | null
  }
}
