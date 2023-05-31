import { Pipe, PipeTransform } from '@angular/core'
import { Product } from 'src/app/models/product.model';


@Pipe({
  name: 'getproduct',
})
export class getProductPipe implements PipeTransform {
  transform(pid: number, products: Product[]): Product {
    return products.find(product => product.id === pid)!

  }
}
