import { Leasecar } from "./model/leasecar";
import { Order } from "./model/order";
import { Contract } from "./model/contract";

export interface TableData {
  data: Leasecar | Order | Contract
}
