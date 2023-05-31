import { NgModule } from '@angular/core'
import { CountlogPipe } from 'src/app/pipes/countlog.pipe';

@NgModule({
  declarations: [CountlogPipe],
  exports: [CountlogPipe],
  providers: [CountlogPipe]
})
export class CountlogPipeModule { }
