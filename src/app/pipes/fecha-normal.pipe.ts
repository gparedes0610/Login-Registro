import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaNormal'
})
export class FechaNormalPipe implements PipeTransform {

  transform(value: string): unknown {
    const transformedDate = value.split('T')[0];
    return transformedDate;
  }

}
