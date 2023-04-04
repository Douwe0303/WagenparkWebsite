export interface Contract {
  data: {
    id: {
      value?: number,
      translation: string
    }
    contractType: {
      value?: string,
      translation: string
    }
    signed: {
      value?: string,
      original?: boolean,
      translation: string
    }
    duration: {
      value?: string,
      translation: string
    }
    startDate: {
      value?: string,
      translation: string
    }
    endDate: {
      value?: string,
      translation: string
    }
    remainingTime: {
      value?: string,
      translation: string
    }
    taxAddition: {
      value?: number,
      translation: string
    }
    contribution: {
      value?: number,
      translation: string
    }
  }
}
