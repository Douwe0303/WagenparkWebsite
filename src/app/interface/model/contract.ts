import { Data } from "./data";

export interface Contract {
  data: {
    id: Data<number | undefined>
    contractType: Data<string | undefined>
    signed: Data<boolean | undefined>
    duration: Data<string | undefined>
    startDate: Data<string | undefined>
    endDate: Data<string | undefined>
    remainingTime: Data<string | undefined>
    taxAddition: Data<number | undefined>
    contribution: Data<number | undefined>
  }
}
