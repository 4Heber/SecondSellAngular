import { NgModule } from '@angular/core'
import { getUserPipe } from 'src/app/pipes/getuser.pipe';

@NgModule({
  declarations: [getUserPipe],
  exports: [getUserPipe],
})
export class getUserPipeModule { }
