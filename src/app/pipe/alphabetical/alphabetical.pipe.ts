import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alphabetical'
})
export class AlphabeticalPipe implements PipeTransform {
  transform(value: any): any {
    if (!value || typeof value !== 'object') {
      return value;
    }

    const keys = Object.keys(value);
    const values = keys.map(key => value[key]);

    return values.sort((a, b) => a.text.localeCompare(b.text));
  }
}
