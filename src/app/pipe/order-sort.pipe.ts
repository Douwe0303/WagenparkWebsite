import {Pipe, PipeTransform} from '@angular/core';
import {Order} from "../interface/order";
import {Sorting} from "../enum/sorting";

@Pipe({
  name: 'orderSort'
})
export class OrderSortPipe implements PipeTransform {
  transform(array: Order[], field: string, sorting: Sorting): any[] {
    if (!Array.isArray(array)) {
      //@ts-ignore
      return;
    }

    if(sorting == Sorting.DESC) {
      array.sort((a: any, b: any) => {
        if (a[field] < b[field]) {
          return -1;
        } else if (a[field] > b[field]) {
          return 1;
        } else {
          return 0;
        }
      });
    }

    else if(sorting == Sorting.ASC) {
      array.sort((a: any, b: any) => {
        if (a[field] > b[field]) {
          return -1;
        } else if (a[field] < b[field]) {
          return 1;
        } else {
          return 0;
        }
      });
    }

    return array;
  }
}
