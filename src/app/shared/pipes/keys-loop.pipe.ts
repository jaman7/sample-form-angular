import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';

interface KeyValue {
  key: string;
  value: any[];
}

@Pipe({
  name: 'objectToArray',
})
export class ObjectToArrayPipe implements PipeTransform {
  transform(value: { [key: string]: any } | null | undefined): KeyValue[] {
    if (value == null) {
      return [];
    }

    return Object.keys(value).map(key => ({ key, value: value[key] }));
  }
}
