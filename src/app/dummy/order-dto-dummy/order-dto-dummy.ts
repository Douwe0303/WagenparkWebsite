import {LeasecarDtoDummy} from "../leasecar-dto-dummy/leasecar-dto-dummy";

export const OrderDtoDummy = {
  id: undefined,
  orderer: "",
  supplier: "LeasePlan",
  leaseOrderStatus: "ORDERED",
  orderDate: "",
  deliveryDate: "",
  weekOfDelivery: 0,
  leaseCar: LeasecarDtoDummy
}
