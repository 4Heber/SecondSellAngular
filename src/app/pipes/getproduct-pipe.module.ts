import { NgModule } from '@angular/core'
import { getProductPipe } from 'src/app/pipes/getprodcut.pipe';

@NgModule({
  declarations: [getProductPipe],
  exports: [getProductPipe],
})
export class getProductPipeModule { }
