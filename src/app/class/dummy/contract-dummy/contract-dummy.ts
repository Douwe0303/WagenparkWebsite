import {Contract} from "../../../interface/model/contract";

export class ContractDummy implements Contract {
  data: any = {
    id: {
      value: 0,
      toDisplay: 0,
      translation: "id"
    },
    contractType: {
      value: "A",
      toDisplay: "",
      translation: "Regeling"
    },
    signed: {
      value: false,
      toDisplay: "",
      translation: "Ondertekend"
    },
    duration: {
      value: "",
      toDisplay: "",
      translation: "Looptijd"
    },
    startDate: {
      value: "",
      toDisplay: "",
      translation: "Startdatum contract"
    },
    endDate: {
      value: "",
      toDisplay: "",
      translation: "Einddatum contract"
    },
    remainingTime: {
      value: "",
      toDisplay: "",
      translation: "Resterende tijd"
    },
    taxAddition: {
      value: 0,
      toDisplay: 0,
      translation: "Fiscale bijtelling"
    },
    contribution: {
      value: 0,
      toDisplay: "",
      translation: "Eigen bijdrage"
    }
  }
}
