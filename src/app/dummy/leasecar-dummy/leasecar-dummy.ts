import { Leasecar } from "../../interface/model/leasecar";
import { ContractDummy } from "../contract-dummy/contract-dummy";

export class LeasecarDummy implements Leasecar {
  data: any = {
    id: {
      value: 0,
      type: 'number',
      required: true,
      toDisplay: 0,
      translation: "id"
    },
    brand: {
      value: "",
      type: 'text',
      required: false,
      toDisplay: "",
      translation: "Automerk"
    },
    driver: {
      value: "",
      type: 'text',
      required: true,
      toDisplay: "",
      translation: "Bestuurder"
    },
    model: {
      value: "",
      type: 'text',
      required: false,
      toDisplay: "",
      translation: "Model",
    },
    extra: {
      value: "",
      type: 'text',
      required: false,
      toDisplay: "",
      translation: "Extra/kleur"
    },
    engine: {
      value: "UNKNOWN",
      type: 'text',
      required: false,
      toDisplay: "Onbekend",
      translation: "Type motor"
    },
    kilometers: {
      value: 0,
      type: 'number',
      required: false,
      toDisplay: 0,
      translation: "Kilometrage"
    },
    price: {
      value: 0,
      type: 'number',
      required: false,
      toDisplay: 0,
      translation: "Fiscale waarde"
    },
    particularities: {
      value: "",
      type: 'text',
      required: false,
      toDisplay: 0,
      translation: "Bijzonderheden"
    },
    contract: new ContractDummy()
  }
}
