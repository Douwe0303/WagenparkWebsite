import { Pipe, PipeTransform } from '@angular/core';
import { Sorting } from "../../../enum/sorting";
import { Order } from "../../../interface/order";

@Pipe({
  name: 'orderSort'
})
export class OrderSortPipe implements PipeTransform {
  transform(array: Order[], field: string, sorting: Sorting, reload: boolean): any[] {
    if (!Array.isArray(array)) {
      //@ts-ignore
      return;
    }

    console.log(array);
    console.log(sorting);
    console.log(field);

    if(sorting == Sorting.DESC) {
      console.log("DESCENDING");
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
      console.log("ASCENDING");
      array.sort((a: any, b: any) => {
        console.log("test");
        if (a.data[field].value > b.data[field].value) {
          console.log("test-1");
          return -1;
        } else if (a.data[field].value < b.data[field].value) {
          console.log("test1");
          return 1;
        } else {
          console.log("test0");
          return 0;
        }
      });
    }

    console.log(array);
    return array;
  }
}
