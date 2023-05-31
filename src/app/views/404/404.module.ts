import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PaginationPipe } from 'src/app/pipes/product.pipe';
import { PaginationPipeModule } from 'src/app/pipes/product-pipe.module';
import { TopPipeModule } from 'src/app/pipes/top-pipe.module';
import { CategorySizePipeModule } from 'src/app/pipes/categorySize-pipe.module';
import { TimePipeModule } from 'src/app/pipes/time-pipe.module';
import { DescLenPipeeModule } from 'src/app/pipes/desc-pipe.module';

@NgModule({
  imports: [CommonModule, PaginationPipeModule, TopPipeModule, CategorySizePipeModule, TimePipeModule, DescLenPipeeModule
  ],

})
export class CartComponentModule { }
