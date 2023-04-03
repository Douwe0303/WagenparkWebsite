import { Leasecar } from "../../../interface/model/leasecar";

export class LeasecarDummy implements Leasecar {
  data: any = {
    id: {
      value: 0,
      translation: "id"
    },
    brand: {
      value: "",
      translation: "Automerk"
    },
    driver: {
      value: "",
      translation: "Bestuurder"
    },
    model: {
      value: "",
      translation: "Model",
    },
    extra: {
      value: "",
      translation: "Extra/kleur"
    },
    engine: {
      value: "",
      translation: "Type motor"
    },
    kilometers: {
      value: 0,
      translation: "Kilometrage"
    },
    price: {
      value: "",
      translation: "Fiscale waarde"
    },
    particularities: {
      value: "",
      translation: "Bijzonderheden"
    }
  }
}
