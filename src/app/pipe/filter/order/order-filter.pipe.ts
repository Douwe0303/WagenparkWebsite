import { Pipe, PipeTransform } from '@angular/core';
import {Order} from "../../../interface/order";

@Pipe({
  name: 'orderFilter'
})
export class OrderFilterPipe implements PipeTransform {

  transform(orders: Order[], searchText: string, reload: boolean): any[] {
    if (!orders) {
      return [];
    }
    if (!searchText) {
      return orders;
    }
    searchText = searchText.toLocaleLowerCase();

    return orders.filter(it => {
      return it.data.orderer.value.toLocaleLowerCase().includes(searchText);
    });
  }

}
