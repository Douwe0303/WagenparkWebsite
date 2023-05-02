import { Injectable } from '@angular/core';
import {SortingType} from "../../enum/sorting-type";
import {RowData} from "../../interface/row-data";

@Injectable({
  providedIn: 'root'
})
export class SortService {

  sortRowData(data: any, rowData: any): RowData[] {
    return rowData.sort((a: any, b: any) => {
      const valueA = a.tableData[data.index].value;
      const valueB = b.tableData[data.index].value;
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return data.sorting == SortingType.ASC ? valueA - valueB : valueB - valueA;
      } else {
        const stringA = valueA.toString();
        const stringB = valueB.toString();
        return data.sorting == SortingType.ASC ? stringA.localeCompare(stringB) : stringB.localeCompare(stringA);
      }
    })
  }
}
