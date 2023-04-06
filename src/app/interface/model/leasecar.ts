import { Contract } from "./contract";

export interface Leasecar {
  data: {
    id: {
      value?: number,
      toDisplay?: number,
      translation: string,
    }
    brand: {
      value?: string,
      toDisplay?: string,
      translation: string
    }
    driver: {
      value?: string,
      toDisplay?: string,
      translation: string
    }
    model: {
      value?: string,
      toDisplay?: string,
      translation: string
    }
    extra: {
      value?: string,
      toDisplay?: string,
      translation: string
    }
    engine: {
      value?: string,
      toDisplay?: string,
      translation: string
    }
    kilometers: {
      value?: number,
      toDisplay?: number,
      translation: string
    }
    price: {
      value?: number,
      toDisplay?: string,
      translation: string
    }
    particularities: {
      value?: string,
      toDisplay?: string,
      translation: string
    },
    contract: Contract
  }
}
