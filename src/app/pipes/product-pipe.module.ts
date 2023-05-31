import { NgModule } from '@angular/core'
import { PaginationPipe } from 'src/app/pipes/product.pipe';

@NgModule({
  declarations: [PaginationPipe],
  exports: [PaginationPipe],
})
export class PaginationPipeModule { }
