import { Pipe, PipeTransform } from '@angular/core'
import { Category } from 'src/app/models/category.model';


@Pipe({
  name: 'category',
})
export class CategorySizePipe implements PipeTransform {
  transform(categories: Category[], itemsPerPage: number): Category[] {
    return categories.slice(0, itemsPerPage)

  }
}
