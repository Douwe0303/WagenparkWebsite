import { Contract } from "../../interface/model/contract";

export const ContractDummy: Contract = {
  id: {
    value: undefined,
    type: 'number',
    required: true,
    toDisplay: '',
    translation: "id"
  },
  contractType: {
    value: "A",
    type: 'text',
    required: false,
    toDisplay: "A",
    translation: "Regeling"
  },
  signed: {
    value: false,
    type: 'text',
    required: false,
    toDisplay: "Nee",
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
    date: null,
    toDisplay: "",
    translation: "Startdatum contract"
  },
  endDate: {
    value: "",
    type: 'date',
    required: false,
    date: null,
    toDisplay: "",
    translation: "Einddatum contract"
  },
  remainingTime: {
    value: "",
    type: 'text',
    required: false,
    toDisplay: "",
    translation: "Resterende tijd"
  },
  taxAddition: {
    value: 0,
    type: 'number',
    required: false,
    toDisplay: 0+'%',
    translation: "Fiscale bijtelling"
  },
  contribution: {
    value: 0,
    type: 'number',
    required: false,
    toDisplay: 0+"%",
    translation: "Eigen bijdrage"
  }
}
