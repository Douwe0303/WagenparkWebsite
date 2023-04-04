import { Contract } from "./contract";

export interface Leasecar {
  data: {
    id: {
      value?: number,
      translation: string,
    }
    brand: {
      value?: string,
      translation: string
    }
    driver: {
      value?: string,
      translation: string
    }
    model: {
      value?: string,
      translation: string
    }
    extra: {
      value?: string,
      translation: string
    }
    engine: {
      value?: string,
      translation: string
    }
    kilometers: {
      value?: number,
      translation: string
    }
    price: {
      value?: number,
      translation: string
    }
    particularities: {
      value?: string,
      translation: string
    },
    contract: Contract
  }
}
