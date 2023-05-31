import { NgModule } from '@angular/core'
import { CategorySizePipe } from 'src/app/pipes/categorySize.pipe';

@NgModule({
  declarations: [CategorySizePipe],
  exports: [CategorySizePipe],
})
export class CategorySizePipeModule { }
