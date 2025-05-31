import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'invertirTexto',
  standalone: true
})
export class InvertirTextoPipe implements PipeTransform {
  transform(value: string): string {
    return value.split('').reverse().join('');
  }
}