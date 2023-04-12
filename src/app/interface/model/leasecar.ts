import { Contract } from "./contract";
import {Data} from "./data";

export interface Leasecar {
  data: {
    id: Data<number | undefined>
    brand: Data<string | undefined>
    driver: Data<string>
    model: Data<string | undefined>
    extra: Data<string | undefined>
    engine: Data<string | undefined>
    kilometers: Data<number | undefined>
    price: Data<number | undefined>
    particularities: Data<string | undefined>
    contract: Contract
  }
}
