import { Transformer } from "../../../interface/transformer";
import { Contract } from "../../../interface/model/contract";
import { ContractDto } from "../../../interface/dto/contract-dto";
import { Injectable } from "@angular/core";

@Injectable()
export class ContractTransformer implements Transformer<Contract, ContractDto> {
  toDto(model: Contract): ContractDto {
    return {
      id: model.data.id.value,
      contractType: model.data.contractType.value,
      signed: model.data.signed.value,
      startDate: model.data.startDate.value,
      endDate: model.data.endDate.value,
      taxAddition: model.data.taxAddition.value,
      contribution: model.data.contribution.value
    }
  }

  toModel(dto: ContractDto): Contract {
    return {
      data: {
        id: {
          value: dto.id,
          translation: "id"
        },
        contractType: {
          value: dto.contractType,
          translation: "Regeling"
        },
        signed: {
          value: dto.signed,
          translation: "Ondertekend"
        },
        startDate: {
          value: dto.startDate,
          translation: "Startdatum contract"
        },
        endDate: {
          value: dto.endDate,
          translation: "Einddatum contract"
        },
        taxAddition: {
          value: dto.taxAddition,
          translation: "Fiscale bijtelling"
        },
        contribution: {
          value: dto.contribution,
          translation: "Eigen bijdrage"
        }
      }
    }
  }
}
