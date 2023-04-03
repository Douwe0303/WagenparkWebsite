import { Transformer } from "../../../interface/transformer"
import { Leasecar } from "../../../interface/model/leasecar";
import { LeasecarDto } from "../../../interface/dto/leasecar-dto";
import { Injectable } from "@angular/core";
import { ContractTransformer } from "../contract-transformer/contract-transformer";
import { ContractDto } from "../../../interface/dto/contract-dto";
import { Contract } from "../../../interface/model/contract";

@Injectable()
export class LeasecarTransformer implements Transformer<Leasecar, LeasecarDto> {

  constructor(private contractTransformer: ContractTransformer) {}

  toModel(leasecarDto: LeasecarDto): Leasecar {
    let contract: Contract = this.contractTransformer.toModel(leasecarDto.contract);
    return {
      data: {
        id: {
          value: leasecarDto.id,
          translation: "id"
        },
        driver: {
          value: leasecarDto.driver,
          translation: "Bestuurder"
        },
        brand: {
          value: leasecarDto.brand,
          translation: "Automerk"
        },
        model: {
          value: leasecarDto.model,
          translation: "Model",
        },
        extra: {
          value: leasecarDto.extra,
          translation: "Extra/kleur"
        },
        engine: {
          value: leasecarDto.engine,
          translation: "Type motor"
        },
        kilometers: {
          value: leasecarDto.kilometers,
          translation: "Kilometrage"
        },
        price: {
          value: leasecarDto.price,
          translation: "Fiscale waarde"
        },
        particularities: {
          value: leasecarDto.particularities,
          translation: "Bijzonderheden"
        },
        contract: contract
      }
    }
  }

  toDto(leasecar: Leasecar): LeasecarDto {
    let contract: ContractDto = this.contractTransformer.toDto(leasecar.data.contract);
    return {
      id: leasecar.data.id.value,
      brand: leasecar.data.brand.value,
      driver: leasecar.data.driver.value,
      model: leasecar.data.model.value,
      extra: leasecar.data.extra.value,
      engine: leasecar.data.engine.value,
      kilometers: leasecar.data.kilometers.value,
      price: leasecar.data.price.value,
      particularities: leasecar.data.particularities.value,
      contract: contract
    }
  }
}
