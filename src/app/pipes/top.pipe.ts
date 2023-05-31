import { Pipe, PipeTransform } from '@angular/core'
import { Product } from 'src/app/models/product.model'


@Pipe({
  name: 'top',
})
export class TopPipe implements PipeTransform {
  transform(products: Product[]): Product[] {
    const sortedProducts = products.sort((a, b) => b.id! - a.id!);
    return sortedProducts.slice(0, 10);
  }

}
