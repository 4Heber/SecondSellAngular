import { NgModule } from '@angular/core'
import { TimePipe } from 'src/app/pipes/time.pipe';

@NgModule({
  declarations: [TimePipe],
  exports: [TimePipe],
})
export class TimePipeModule { }
