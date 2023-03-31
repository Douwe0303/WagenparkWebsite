import {Leasecar} from "./leasecar";

export interface Order {
  data: {
    id: {
      value?: number,
      translation: string
    }
    supplier: {
      value: string,
      translation: string
    }
    orderer: {
      value: string,
      translation: string
    }
    leaseOrderStatus: {
      value: string,
      data: any,
      translation: string
    }
    orderDate: {
      value: string,
      translation: string
    }
    deliveryDate: {
      value?: string,
      translation: string
    }
    weekOfDelivery: {
      value?: number,
      translation: string
    }
    quotationPath: {
      value?: string,
      translation: string
    }
    leasePlanPath: {
      value?: string,
      translation: string
    },
    leasecar: Leasecar
  }
}
