import { Transformer } from "../../interface/transformer";
import { Contract } from "../../interface/model/contract";
import { ContractDto } from "../../interface/dto/contract-dto";
import { Injectable } from "@angular/core";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { CustomDateParser } from "../../class/customDateParser/custom-date-parser";

@Injectable()
export class ContractTransformer implements Transformer<Contract, ContractDto> {

  constructor(private customDateParser: CustomDateParser){}

  toDto(model: Contract): ContractDto {
    return {
      id: model.id.value as number,
      contractType: model.contractType.value as string,
      signed: model.signed.value as boolean,
      startDate: this.getDate(model.startDate.date),
      endDate: this.getDate(model.endDate.date),
      taxAddition: model.taxAddition.value as number,
      contribution: model.contribution.value as number
    }
  }

  toModel(dto: ContractDto): Contract {
    return {
      id: {
        value: dto.id,
        type: 'number',
        required: true,
        toDisplay: dto.id == undefined ? '' : dto.id+'',
        translation: "id"
      },
      contractType: {
        value: dto.contractType,
        type: 'text',
        required: false,
        toDisplay: dto.contractType == null ? '' : dto.contractType,
        translation: "Regeling"
      },
      signed: {
        value: dto.signed,
        type: 'text',
        required: false,
        toDisplay: dto.signed ? "Ja" : "Nee",
        translation: "Ondertekend"
      },
      duration: {
        value: this.getDuration(dto.startDate, dto.endDate),
        required: false,
        type: 'number',
        toDisplay: this.getDuration(dto.startDate, dto.endDate),
        translation: "Looptijd"
      },
      startDate: {
        value: dto.startDate,
        type: 'date',
        required: false,
        date: dto.startDate == undefined ? undefined : this.customDateParser.parse(dto.startDate),
        toDisplay: dto.startDate  == null ? '' : dto.startDate,
        translation: "Startdatum contract"
      },
      endDate: {
        value: dto.endDate,
        type: 'date',
        required: false,
        date: dto.endDate == undefined ? undefined : this.customDateParser.parse(dto.endDate),
        toDisplay: dto.endDate == null ? '' : dto.endDate,
        translation: "Einddatum contract"
      },
      remainingTime: {
        value: this.getRemainingTime(dto.endDate),
        required: false,
        type: 'text',
        toDisplay: this.getRemainingTime(dto.endDate),
        translation: "Resterende tijd"
      },
      taxAddition: {
        value: dto.taxAddition,
        required: false,
        type: 'number',
        toDisplay: dto.taxAddition + "%",
        translation: "Fiscale bijtelling"
      },
      contribution: {
        value: dto.contribution,
        required: false,
        type: 'number',
        toDisplay: dto.contribution + "%",
        translation: "Eigen bijdrage"
      }
    }
  }

  getDuration(startString: string | undefined, endString: string | undefined): string {
    if(startString == undefined || endString == undefined) {
      return "";
    }

    let startDate: Date | null = this.parseDate(startString);
    let endDate: Date | null = this.parseDate(endString);

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
    let endDate: Date | null = this.parseDate(endString);

    if(!endDate) {
      return "";
    }

    let diff = endDate.getTime() - today.getTime();
    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let hours = Math.floor(diff / (1000 * 60 * 60) - (days * 24));

    if(days == 1) {
      return days + ' dag en ' + hours + ' uur';
    } else if(days < 1) {
      return 0 + ' dagen en ' + hours + ' uur';
    } else {
      return days + ' dagen en ' + hours + ' uur';
    }
  }

  private parseDate(dateString: string): Date | null {
    const parts = dateString.split('-');
    if (parts.length !== 3) {
      return null;
    }
    const year = parseInt(parts[2], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[0], 10);
    return new Date(year, month, day);
  }

  getDate(date: NgbDateStruct | undefined | null): string | undefined {
    if(date != null) {
      return date.day + "-" + date.month + "-" + date.year;
    } else {
      return "";
    }
  }
}
