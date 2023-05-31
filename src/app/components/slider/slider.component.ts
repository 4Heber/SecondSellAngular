import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
  @Input() products!: Product[]
  constructor(private router: Router) { }

  public productRedirect(productId: number) {
    const proute = `/product/${productId}`
    this.router.navigate([proute])

  }

}
