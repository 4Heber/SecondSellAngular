import { NgModule } from '@angular/core'
import { SliderFilter } from 'src/app/pipes/slider-filter.pipe';

@NgModule({
  declarations: [SliderFilter],
  exports: [SliderFilter],
})
export class SliderFilterModule { }
