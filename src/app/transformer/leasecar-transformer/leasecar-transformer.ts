import { Transformer } from "../../interface/transformer"
import { Leasecar } from "../../interface/model/leasecar";
import { LeasecarDto } from "../../interface/dto/leasecar-dto";
import { Injectable } from "@angular/core";
import { ContractTransformer } from "../contract-transformer/contract-transformer";
import { ContractDto } from "../../interface/dto/contract-dto";
import { Contract } from "../../interface/model/contract";
import { EngineType } from "../../type/engine-type/engine-type";

@Injectable()
export class LeasecarTransformer implements Transformer<Leasecar, LeasecarDto> {

  constructor(private contractTransformer: ContractTransformer) {}

  toDto(leasecar: Leasecar): LeasecarDto {
    let contract: ContractDto = this.contractTransformer.toDto(leasecar.contract);
    return {
      id: leasecar.id.value as number,
      licensePlate: leasecar.licensePlate.value as string,
      brand: leasecar.brand.value as string,
      driver: leasecar.driver.value as string,
      model: leasecar.model.value as string,
      extra: leasecar.extra.value as string,
      engine: leasecar.engine.value as string,
      kilometers: leasecar.kilometers.value as number,
      price: leasecar.price.value as number,
      particularities: leasecar.particularities.value as string,
      contract: contract
    }
  }

  toModel(leasecarDto: LeasecarDto): Leasecar {
    let contract: Contract = this.contractTransformer.toModel(leasecarDto.contract);
    return {
      id: {
        value: leasecarDto.id,
        type: 'number',
        required: true,
        toDisplay: leasecarDto.id+'',
        translation: "id"
      },
      licensePlate: {
        value: leasecarDto.licensePlate,
        type: 'string',
        required: true,
        toDisplay: leasecarDto.licensePlate+'',
        translation: "Kenteken"
      },
      driver: {
        value: leasecarDto.driver,
        type: 'text',
        required: true,
        toDisplay: leasecarDto.driver,
        translation: "Bestuurder"
      },
      brand: {
        value: !leasecarDto.brand ? '' : leasecarDto.brand,
        type: 'text',
        required: false,
        toDisplay: leasecarDto.brand,
        translation: "Automerk"
      },
      model: {
        value: leasecarDto.model,
        type: 'text',
        required: false,
        toDisplay: leasecarDto.model,
        translation: "Model",
      },
      extra: {
        value: leasecarDto.extra,
        type: 'text',
        required: false,
        toDisplay: leasecarDto.extra,
        translation: "Extra/kleur"
      },
      engine: {
        value: leasecarDto.engine,
        type: 'text',
        required: false,
        //@ts-ignore
        toDisplay: EngineType[leasecarDto.engine.toLowerCase()].text,
        translation: "Type motor"
      },
      kilometers: {
        value: leasecarDto.kilometers,
        type: 'number',
        required: false,
        toDisplay: leasecarDto.kilometers+'',
        translation: "Kilometrage"
      },
      price: {
        value: leasecarDto.price,
        type: 'number',
        required: false,
        toDisplay: "€" + leasecarDto.price,
        translation: "Fiscale waarde"
      },
      particularities: {
        value: leasecarDto.particularities,
        type: 'text',
        required: false,
        toDisplay: leasecarDto.particularities,
        translation: "Bijzonderheden"
      },
      contract: contract
    }
  }
}
