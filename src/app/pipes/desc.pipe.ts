import { Pipe, PipeTransform } from '@angular/core'
import { Category } from 'src/app/models/category.model';


@Pipe({
  name: 'desclen',
})
export class DescLenPipe implements PipeTransform {
  transform(texto: string): string {
    if (texto.length > 13) {
      return texto.slice(0, 13) + "...";
    } else {
      return texto;
    }

  }
}
