export interface ContractDto {
  id?: number,
  contractType?: string,
  signed?: boolean,
  startDate?: string,
  endDate?: string,
  taxAddition?: number,
  contribution?: number
}
