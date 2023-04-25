import { Contract } from "./contract";
import { Data } from "../data";

export interface Leasecar {
  id: Data
  leaseOrderId: Data
  licensePlate: Data
  brand: Data
  driver: Data
  model: Data
  extra: Data
  engine: Data
  kilometers: Data
  price: Data
  particularities: Data
  contract: Contract
}
