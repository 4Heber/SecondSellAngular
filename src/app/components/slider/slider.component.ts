import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, take } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements AfterViewInit,OnInit {
  @Input() products!: Product[]
  private slideCount = 1
  private translateXValue = 0
  private carouselInterval$:any
  @Input() slideDef!:boolean
  constructor(private router: Router) { }

  public productRedirect(productId: number) {
    const proute = `/product/${productId}`
    this.router.navigate([proute])

  }
  ngOnInit(): void {
      this.translateXValue = 0
      document.getElementById('slide-me-out')!.style.transform = `translateX(${this.translateXValue}%)`;
      if(this.slideDef != undefined) {
       const ele =  document.getElementById('slide-me-out')!
       ele.classList.add('margined')
      }
  }
  ngAfterViewInit() {
    if(this.slideDef != undefined) {
    this.carouselInterval$ = interval(200).subscribe(() => {
      this.translateXValue += 0.05;

      document.getElementById('slide-me-out')!.style.transform = `translateX(${this.translateXValue}%)`;
      if(this.translateXValue >= 100) {
        this.translateXValue = 0
      }
    });
  }
  }

  ngOnDestroy() {
    if (this.carouselInterval$) {
      this.carouselInterval$.unsubscribe();
    }
    this.translateXValue = 0

  }
}
