import { Leasecar } from "../../../interface/model/leasecar";
import { ContractDummy } from "../contract-dummy/contract-dummy";

export class LeasecarDummy implements Leasecar {
  data: any = {
    id: {
      value: 0,
      toDisplay: 0,
      translation: "id"
    },
    brand: {
      value: "",
      toDisplay: "",
      translation: "Automerk"
    },
    driver: {
      value: "",
      toDisplay: "",
      translation: "Bestuurder"
    },
    model: {
      value: "",
      toDisplay: "",
      translation: "Model",
    },
    extra: {
      value: "",
      toDisplay: "",
      translation: "Extra/kleur"
    },
    engine: {
      value: "",
      toDisplay: "",
      translation: "Type motor"
    },
    kilometers: {
      value: 0,
      toDisplay: 0,
      translation: "Kilometrage"
    },
    price: {
      value: "",
      toDisplay: 0,
      translation: "Fiscale waarde"
    },
    particularities: {
      value: "",
      toDisplay: 0,
      translation: "Bijzonderheden"
    },
    contract: new ContractDummy()
  }
}
