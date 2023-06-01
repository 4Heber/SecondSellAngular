import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCart } from 'src/app/models/cart.model';
import { Category } from 'src/app/models/category.model';
import { Order } from 'src/app/models/order.model';
import { Pagination } from 'src/app/models/pagination.model';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { CountlogPipe } from 'src/app/pipes/countlog.pipe';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/products.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-home',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public productsCart: ProductCart[] = []
  public user: User = {} as User
  public users: User[] = []
  public products: Product[] = []
  public selectedProduct: Product = {} as Product
  public selectedPrice: number[] = [-1, -1]
  public pr: number[] = []
  public loaded = false
  constructor(private countLog: CountlogPipe, private router: Router, private productService: ProductService, private transactionService: TransactionService, private readonly authService: AuthService) {

  }
  ngOnInit(): void {
    this.authService.getUsers().subscribe(() => {
      this.users = this.authService.usuarios
      if (this.authService.getUserByCookie()) {
        this.authService.user.subscribe((us: User) => {
          this.user = us
        })
      }
      else {
        this.authService.user.subscribe((us: User) => {
          if (!(us.username)) {
            this.router.navigate(['/login']);
          }
          else {
            this.user = us
          }
        })
      }
      this.transactionService.getCart(this.user.id!).subscribe(() => {
        this.transactionService.getProductsCart(this.transactionService.cart.id!).subscribe(() => {
          this.productsCart = this.transactionService.productCartList
          this.productService.getProducts().subscribe(() => {
            this.products = this.productService.productList.filter(product => {
              return this.productsCart.some(cartItem => cartItem.productId === product.id);
            });
            this.pr = this.countLog.transform(this.products)
            this.loaded = true
            console.log(this.products)
          })
        })
      })
    })
  }

  public changeSelected(product: Product): void {
    this.selectedProduct = product
    const price = this.productsCart.find((productX: ProductCart) => {
      return productX.productId == product.id
    })
    this.selectedPrice = [product.id!, price?.price! * 2.5]
  }
  public deleteSelected(): void {

    this.selectedProduct = {} as Product
    this.selectedPrice = [-1, -1]
  }
  public buy() {
    this.authService.getUser(this.user.id!).subscribe(() => {
      if (this.user.coins! < this.selectedPrice[1] || this.user.coins == null) {

        this.deleteSelected()
        return
      }
      this.productService.patchProductCart(this.selectedProduct.id!).subscribe(() => {
        this.transactionService.patchChat(true, this.user.id!, this.selectedProduct.id!).subscribe(() => {
          this.transactionService.patchUserCoins((this.user.coins! - this.selectedPrice[1]), this.user.id!).subscribe(() => {
            this.authService.getUser(this.user.id!).subscribe(() => {
              this.transactionService.getCart(this.user.id!).subscribe(() => {
                this.transactionService.getProductsCart(this.transactionService.cart.id!).subscribe(() => {
                  this.productsCart = this.transactionService.productCartList
                  this.productService.getProducts().subscribe(() => {
                    this.products = this.productService.productList.filter(product => {
                      return this.productsCart.some(cartItem => cartItem.productId === product.id);
                    });
                    const order = {
                      buyer: this.user.id!,
                      seller: this.selectedProduct.seller_id!,
                      created_at: new Date,
                      price: this.selectedPrice[1],
                      productId: this.selectedProduct.id!
                    } as Order
                    this.transactionService.postOrder(order).subscribe(() => {
                      this.deleteSelected()

                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  }

}
