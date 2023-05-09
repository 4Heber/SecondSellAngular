import { Pipe, PipeTransform } from '@angular/core'
import { Product } from 'src/app/models/product.model'


@Pipe({
  name: 'a',
})
export class PaginationPipe implements PipeTransform {
  transform(products: Product[], itemsPerPage: number): Product[] {
    return products.slice(0, itemsPerPage);

  }
}
