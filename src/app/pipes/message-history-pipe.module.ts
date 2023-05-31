import { NgModule } from '@angular/core'
import { getByDatePipe } from 'src/app/pipes/message-history.pipe';

@NgModule({
  declarations: [getByDatePipe],
  exports: [getByDatePipe],
})
export class getByDatePipeModule { }
