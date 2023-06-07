import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, take } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements AfterViewInit {
  @Input() products!: Product[]
  private slideCount = 0
  constructor(private router: Router) { }

  public productRedirect(productId: number) {
    const proute = `/product/${productId}`
    this.router.navigate([proute])

  }
  ngAfterViewInit() {
    const products = document.getElementsByClassName('desktop-element')
    const carouselInterval$ = interval(3000).pipe(take(this.slideCount));
    carouselInterval$.subscribe(() => {
      console.log('interval entered')
    });
  }

}
