import { LeasecarDto } from "./leasecar-dto";

export interface OrderDto {
  id?: number;
  orderer: string;
  supplier: string;
  leaseOrderStatus: string;
  orderDate: string;
  deliveryDate?: string;
  weekOfDelivery?: number;
  quotationPath?: string;
  leasePlanPath?: string;
  leaseCar: LeasecarDto;
}
