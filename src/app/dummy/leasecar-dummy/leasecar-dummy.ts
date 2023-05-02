import { Leasecar } from "../../interface/model/leasecar";
import { ContractDummy } from "../contract-dummy/contract-dummy";

export const LeasecarDummy: Leasecar = {
    id: {
      value: undefined,
      type: 'number',
      required: true,
      toDisplay: undefined+'',
      translation: "id"
    },
    leaseOrderId: {
      value: undefined,
      type: 'number',
      required: false,
      toDisplay: undefined+'',
      translation: 'leaseOrderId'
    },
    licensePlate: {
      value: '',
      type: 'text',
      required: false,
      toDisplay: '',
      translation: 'Kenteken'
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
    tires: {
      value: "UNKNOWN",
      type: 'text',
      required: false,
      toDisplay: 'Onbekend',
      translation: "Type band"
    },
    kilometers: {
      value: 0,
      type: 'number',
      required: false,
      toDisplay: 0+'',
      translation: "Kilometrage"
    },
    price: {
      value: 0,
      type: 'number',
      required: false,
      toDisplay: '€'+0,
      translation: "Fiscale waarde"
    },
    particularities: {
      value: "",
      type: 'text',
      required: false,
      toDisplay: '',
      translation: "Bijzonderheden"
    },
    contract: ContractDummy
}
