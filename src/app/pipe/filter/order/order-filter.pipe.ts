import { Pipe, PipeTransform } from '@angular/core';
import {Order} from "../../../interface/model/order";

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
      // @ts-ignore
      return it.data.leasecar.data.driver.value.toLocaleLowerCase().includes(searchText);
    });
  }

}
