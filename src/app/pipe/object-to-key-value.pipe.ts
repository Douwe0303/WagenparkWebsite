import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectToKeyValue'
})
export class ObjectToKeyValuePipe implements PipeTransform {
  transform(value: any): any[] {
    if (!value) return [];

    return Object.keys(value).map((key) => ({
      key,
      value: value[key]
    }));
  }
}
