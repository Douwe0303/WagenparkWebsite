import { Leasecar } from "./leasecar";

export interface Order {
  data: {
    id: {
      value?: number,
      toDisplay?: number,
      translation: string
    }
    orderer: {
      value: string,
      toDisplay: string,
      translation: string,
    }
    supplier: {
      value: string,
      toDisplay: string,
      translation: string,
    }
    leaseOrderStatus: {
      value: string,
      toDisplay: string,
      data: any,
      translation: string
    }
    orderDate: {
      value: string,
      toDisplay: string,
      translation: string,
    }
    deliveryDate: {
      value?: string,
      toDisplay?: string,
      translation: string,
    }
    weekOfDelivery: {
      value?: number,
      toDisplay?: number,
      translation: string,
    }
    quotationPath: {
      value?: string,
      toDisplay?: string,
      path?: string,
      file?: FormData,
      translation: string,
    }
    leasePlanPath: {
      value?: string,
      toDisplay?: string,
      path?: string,
      file?: FormData,
      translation: string,
    },
    leasecar: Leasecar
  }
}
