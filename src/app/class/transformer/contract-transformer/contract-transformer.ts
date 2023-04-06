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
          toDisplay: dto.id,
          translation: "id"
        },
        contractType: {
          value: dto.contractType,
          toDisplay: dto.contractType == null ? '' : dto.contractType,
          translation: "Regeling"
        },
        signed: {
          value: dto.signed,
          toDisplay: this.getSigned(dto.signed),
          translation: "Ondertekend"
        },
        duration: {
          value: this.getDuration(dto.startDate, dto.endDate),
          toDisplay: this.getDuration(dto.startDate, dto.endDate),
          translation: "Looptijd"
        },
        startDate: {
          value: dto.startDate,
          toDisplay: dto.startDate  == null ? '' : dto.startDate,
          translation: "Startdatum contract"
        },
        endDate: {
          value: dto.endDate,
          toDisplay: dto.endDate == null ? '' : dto.endDate,
          translation: "Einddatum contract"
        },
        remainingTime: {
          value: this.getRemainingTime(dto.endDate),
          toDisplay: this.getRemainingTime(dto.endDate),
          translation: "Resterende tijd"
        },
        taxAddition: {
          value: dto.taxAddition,
          toDisplay: dto.taxAddition + "%",
          translation: "Fiscale bijtelling"
        },
        contribution: {
          value: dto.contribution,
          toDisplay: dto.contribution + "%",
          translation: "Eigen bijdrage"
        }
      }
    }
  }

  getDuration(startString: string | undefined, endString: string | undefined): string {
    if(startString == undefined || endString == undefined) {
      return "";
    }

    let startDate: Date | null = this.parseDate(startString, 'dd-MM-yyyy');
    let endDate: Date | null = this.parseDate(endString, 'dd-MM-yyyy');

    if(!startDate || !endDate) {
      return "";
    }

    let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    let monthDiff = endDate.getMonth() - startDate.getMonth();

    let total = months + monthDiff;

    if(total == 1) {
      return total + ' maand';
    } else if(total < 1) {
      return 0 + ' maanden';
    } else {
      return total + ' maanden';
    }
  }

  getRemainingTime(endString: string | undefined): string {
    if(endString == undefined) {
      return "";
    }

    let today: Date = new Date();
    let endDate: Date | null = this.parseDate(endString, 'yyyy-MM-dd');

    if(!endDate) {
      return "";
    }

    let diff = endDate.getTime() - today.getTime();
    let days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if(days == 1) {
      return days + ' dag';
    } else if(days < 1) {
      return 0 + ' dagen';
    } else {
      return days + ' dagen';
    }
  }

  getSigned(signed: boolean | undefined): string {
    return signed ? 'Ja' : 'Nee';
  }

  private parseDate(dateString: string, format: string): Date | null {
    const parts = dateString.split('-');
    if (parts.length !== 3) {
      return null;
    }
    const year = parseInt(parts[2], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[0], 10);
    return new Date(year, month, day);
  }
}
