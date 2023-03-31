import { Transformer } from "../../../interface/transformer"
import { Leasecar } from "../../../interface/leasecar";
import { LeasecarDto } from "../../../interface/leasecar-dto";
import { Injectable } from "@angular/core";

@Injectable()
export class LeasecarTransformer implements Transformer<Leasecar, LeasecarDto> {
  toModel(leasecarDto: LeasecarDto): Leasecar {
    return {
      data: {
        id: {
          value: leasecarDto.id,
          translation: "id"
        },
        brand: {
          value: leasecarDto.brand,
          translation: "brand"
        },
        driver: {
          value: leasecarDto.driver,
          translation: "bestuurder"
        },
        model: {
          value: leasecarDto.model,
          translation: "model",
        },
        extra: {
          value: leasecarDto.extra,
          translation: "besteldatum"
        },
        engine: {
          value: leasecarDto.engine,
          translation: "leverdatum"
        },
        kilometers: {
          value: leasecarDto.kilometers,
          translation: "verwachte leverweek"
        },
        price: {
          value: leasecarDto.price,
          translation: "factuur"
        },
        particularities: {
          value: leasecarDto.particularities,
          translation: "lease plan"
        }
      }
    }
  }

  toDto(leasecar: Leasecar): LeasecarDto {
    return {
      id: leasecar.data.id.value,
      brand: leasecar.data.brand.value,
      driver: leasecar.data.driver.value,
      model: leasecar.data.model.value,
      extra: leasecar.data.extra.value,
      engine: leasecar.data.engine.value,
      kilometers: leasecar.data.kilometers.value,
      price: leasecar.data.price.value,
      particularities: leasecar.data.particularities.value
    }
  }
}
