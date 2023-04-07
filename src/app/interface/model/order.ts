import { Leasecar } from "./leasecar";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

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
      data?: NgbDateStruct | null,
      toDisplay: string,
      translation: string,
    }
    deliveryDate: {
      value?: string,
      data?: NgbDateStruct | null,
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
      formData?: FormData,
      file?: File,
      path?: string,
      translation: string,
    }
    leasePlanPath: {
      value?: string,
      toDisplay?: string,
      formData?: FormData,
      file?: File,
      path?: string,
      translation: string,
    },
    leasecar: Leasecar
  }
}
