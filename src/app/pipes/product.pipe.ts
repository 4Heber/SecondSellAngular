import { Pipe, PipeTransform } from '@angular/core'
import { Product } from 'src/app/models/product.model'


@Pipe({
  name: 'pagination',
})
export class PaginationPipe implements PipeTransform {
  transform(products: Product[], itemsPerPage: number): Product[] {
    return products.filter((product: Product) => product.active === true).slice(0, itemsPerPage);
  }

}
