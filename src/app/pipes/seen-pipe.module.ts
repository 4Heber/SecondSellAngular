import { NgModule } from '@angular/core'
import { SeenPipe } from 'src/app/pipes/seen.pipe';

@NgModule({
  declarations: [SeenPipe],
  exports: [SeenPipe],
})
export class SeenPipeModule { }
