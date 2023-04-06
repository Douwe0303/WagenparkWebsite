export interface Contract {
  data: {
    id: {
      value?: number,
      toDisplay?: number,
      translation: string
    }
    contractType: {
      value?: string,
      toDisplay?: string,
      translation: string
    }
    signed: {
      value?: boolean,
      toDisplay?: string,
      translation: string
    }
    duration: {
      value?: string,
      toDisplay?: string,
      translation: string
    }
    startDate: {
      value?: string,
      toDisplay?: string,
      translation: string
    }
    endDate: {
      value?: string,
      toDisplay?: string,
      translation: string
    }
    remainingTime: {
      value?: string,
      toDisplay?: string,
      translation: string
    }
    taxAddition: {
      value?: number,
      toDisplay?: string,
      translation: string
    }
    contribution: {
      value?: number,
      toDisplay?: string,
      translation: string
    }
  }
}
