import { Pipe, PipeTransform } from '@angular/core';
import { Sorting } from "../../../enum/sorting";
import { Order } from "../../../interface/model/order";

@Pipe({
  name: 'orderSort'
})
export class OrderSortPipe implements PipeTransform {
  transform(array: Order[], field: string, sorting: Sorting, reload: boolean): any[] {
    if (!Array.isArray(array)) {
      //@ts-ignore
      return;
    }

    if(sorting == Sorting.DESC) {
      array.sort((a: any, b: any) => {
        if (a.data[field].value < b.data[field].value) {
          return -1;
        } else if (a.data[field].value > b.data[field].value) {
          return 1;
        } else {
          return 0;
        }
      });
    }

    else if(sorting == Sorting.ASC) {
      array.sort((a: any, b: any) => {
        if (a.data[field].value > b.data[field].value) {
          return -1;
        } else if (a.data[field].value < b.data[field].value) {
          return 1;
        } else {
          return 0;
        }
      });
    }

    return array;
  }
}
