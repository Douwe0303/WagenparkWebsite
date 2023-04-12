import { ContractDto } from "./contract-dto";

export interface LeasecarDto {
  id?: number;
  brand?: string;
  driver: string;
  model?: string;
  extra?: string;
  engine?: string;
  kilometers?: number;
  price?: number;
  particularities?: string;
  contract: ContractDto;
}
