import { Pipe, PipeTransform } from '@angular/core'
import { Product } from 'src/app/models/product.model';



@Pipe({
  name: 'sliderFilter',
})
export class SliderFilter implements PipeTransform {
  transform(products: Product[], pid: number) {
    return products.filter(product => product.id !== pid && product.active);

  }
}
