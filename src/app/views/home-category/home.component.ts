import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Pagination } from 'src/app/models/pagination.model';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeCategoryComponent implements OnInit {
  public products: Product[] = []
  public categories: Category[] = []
  public pagination: Pagination = {} as Pagination
  public catId = ''
  public catSelected = {} as Category
  public loaded = false
  private readonly categorySize = 9
  private categoryBlank: number[] = []

  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductService, private categoryService: CategoryService) {

  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loaded = false
      this.catId = params['id'];
      this.categoryService.getCategories().subscribe(() => {
        this.categories = this.categoryService.categoryList
        this.productService.getProducts().subscribe(() => {

          let temp = this.categories.find(categoria => categoria.name.toLocaleLowerCase() === this.catId.toLocaleLowerCase());
          if (temp == undefined) {
            this.router.navigate(['/404'])
          }
          this.catSelected = temp!
          this.products = []

          this.productService.productList.forEach((producto) => {
            if (producto.category_id == this.catSelected.id) {
              this.products.push(producto);
            }

          });

          for (let i = 0; i < this.categories.length - this.pagination.categorySize; i++) {
            if (i == this.categorySize / 2) {
              i = this.categories.length
            }
            this.categoryBlank.push(i)
          }
          this.pagination.categroyBlank = this.categoryBlank


          this.pagination.pageSize = 8
          this.pagination.categorySize = 9

          this.pagination.categoryDisplay = false
          this.loaded = true
        })
      })
    })
  }
  public showCategories(): void {
    const showCats = <HTMLInputElement>document.getElementById("inpt-show")!

    if (this.pagination.categoryDisplay === false) {
      document.getElementById("show")!.classList.add("nonMarginTop")
      this.pagination.categorySize = this.categories.length
      this.pagination.categroyBlank = []
      this.pagination.categoryDisplay = true
      showCats.value = "Ver menos"

    }
    else {
      document.getElementById("show")!.classList.remove("nonMarginTop")
      this.pagination.categorySize = this.categorySize
      this.pagination.categroyBlank = this.categoryBlank
      this.pagination.categoryDisplay = false
      showCats.value = "Ver todas"

    }
  }
  public productRedirect(productId: number) {
    const proute = `/product/${productId}`
    this.router.navigate([proute])
  }

}
