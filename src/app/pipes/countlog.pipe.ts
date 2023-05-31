import { Pipe, PipeTransform } from '@angular/core'
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';


@Pipe({
  name: 'countlog',
})
export class CountlogPipe implements PipeTransform {
  transform(products: Product[]): number[] {
    const activeTrueCount = products.filter(product => product.active === true).length;
    const activeFalseCount = products.filter(product => product.active === false).length;
    return [activeTrueCount, activeFalseCount];
  }
}

