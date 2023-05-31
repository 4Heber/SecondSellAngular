import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SeenPipeModule } from 'src/app/pipes/seen-pipe.module';

@NgModule({
  imports: [CommonModule, SeenPipeModule
  ],

})
export class ChatComponentModule { }
