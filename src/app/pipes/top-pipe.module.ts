import { NgModule } from '@angular/core'
import { TopPipe } from 'src/app/pipes/top.pipe';

@NgModule({
  declarations: [TopPipe],
  exports: [TopPipe],
})
export class TopPipeModule { }
