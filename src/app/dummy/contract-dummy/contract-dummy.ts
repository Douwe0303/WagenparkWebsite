import {Contract} from "../../interface/model/contract";

export class ContractDummy implements Contract {
  data: any = {
    id: {
      value: 0,
      type: 'number',
      required: true,
      toDisplay: 0,
      translation: "id"
    },
    contractType: {
      value: "A",
      type: 'text',
      required: false,
      toDisplay: "",
      translation: "Regeling"
    },
    signed: {
      value: false,
      type: 'boolean',
      required: false,
      toDisplay: "",
      translation: "Ondertekend"
    },
    duration: {
      value: "",
      type: 'number',
      required: false,
      toDisplay: "",
      translation: "Looptijd"
    },
    startDate: {
      value: "",
      type: 'date',
      required: false,
      toDisplay: "",
      translation: "Startdatum contract"
    },
    endDate: {
      value: "",
      type: 'date',
      required: false,
      toDisplay: "",
      translation: "Einddatum contract"
    },
    remainingTime: {
      value: "",
      type: 'number',
      required: false,
      toDisplay: "",
      translation: "Resterende tijd"
    },
    taxAddition: {
      value: 0,
      type: 'number',
      required: false,
      toDisplay: 0,
      translation: "Fiscale bijtelling"
    },
    contribution: {
      value: 0,
      type: 'number',
      required: false,
      toDisplay: "",
      translation: "Eigen bijdrage"
    }
  }
}
