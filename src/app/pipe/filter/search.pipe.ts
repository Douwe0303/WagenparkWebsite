import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(data: string[][], searchText: string, searchIndex: number): string[][] {
    if (!data) {
      return [];
    }
    if (!searchText) {
      return data;
    }

    searchText = searchText.toLocaleLowerCase();

    return data.filter(arr => arr[searchIndex].toLowerCase().includes(searchText));
  }
}
