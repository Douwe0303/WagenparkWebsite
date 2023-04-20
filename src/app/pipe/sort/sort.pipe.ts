import { Pipe, PipeTransform } from '@angular/core';
import { SortingType } from "../../enum/sorting-type";

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(data: string[][], sorting: SortingType, index: number): string[][] {
    const getValue = (item: any) => item[index];

    data.sort((a, b) => {
      const valueA = getValue(a);
      const valueB = getValue(b);
      if (typeof valueA === "number" && typeof valueB === "number") {
        return sorting === SortingType.DESC ? valueB - valueA : valueA - valueB;
      } else {
        return sorting === SortingType.DESC ? valueB.localeCompare(valueA) : valueA.localeCompare(valueB);
      }
    });

    return data;
  }

}
