import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { BehaviorSubject, map, Observable, retry, switchMap, throwError } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { Chat, Offer } from 'src/app/models/chat.model';
import { Cart, ProductCart } from 'src/app/models/cart.model';
import { Order } from 'src/app/models/order.model';
@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private readonly CONFIG_URL = 'http://secondsell.randion.es/api';

  public cartList: Cart[] = []
  public cart: Cart = {} as Cart
  public productCartList: ProductCart[] = []
  public productCart: ProductCart = {} as ProductCart

  constructor(public http: HttpClient) {

  }

  public postProductCart(offer: Offer, cartId: number, prodcutID: number,userId:number,token:string): Observable<ProductCart> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<ProductCart>(`${this.CONFIG_URL}/user/${userId}/productCart`, {
      product_id: prodcutID,
      price: offer.price,
      cart_id: cartId
    },{headers})
  }

  public getCarts(): Observable<void> {
    return this.http.get<Cart[]>(`${this.CONFIG_URL}/carts`)
      .pipe(map(((cart: Cart[]) => {
        this.cartList = cart
      })))
  }

  public getCart(userId: number,token:string): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<Cart[]>(`${this.CONFIG_URL}/user/${userId}/cart`,{headers}).pipe(map(((cart:Cart[]) => {
    let temp =  cart.find(item => item.user_id === userId)!;
    if(temp != undefined) {
      this.cart = temp
    }
    })))

  }
  public getProductCart(cartId: number, offer: Offer, prodcutID: number,userid:number,token:string): Observable<ProductCart> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<ProductCart>(`${this.CONFIG_URL}/user/${userid}/productCart/${prodcutID}`,{headers})
     
  }

  public postCart(userId:number,cart: Cart,token:string): Observable<Cart> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
  
    return this.http.post<Cart>(`${this.CONFIG_URL}/user/${userId}/cart`, {userid:userId},{headers})
  }

  public postOrder(order: Order,token:string,userid:number): Observable<Order> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<Order>(`${this.CONFIG_URL}/user/${userid}/order`, order,{headers})
  }

  public getProductsCart(cartId: number,userId:number,token:string): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<ProductCart[]>(`${this.CONFIG_URL}/user/${userId}/productCart/${cartId}`,{headers})
      .pipe(map(((productCart: ProductCart[]) => {
        this.productCartList = productCart
      })))
  }

  public patchProductCart(cartId: number, offer: Offer, productId: number,token:string,userId:number): Observable<ProductCart> {
    const url = `${this.CONFIG_URL}/user/${userId}/productCart/${productId}`;
    const requestBody = {
      product_id: productId,
      price: offer.price
    };
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

          return this.http.patch<ProductCart>(url, requestBody,{headers});
       
  }

  public patchChat(userId: number, prdouctId: number,token:string): Observable<Chat> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    const url = `${this.CONFIG_URL}/user/${userId}/chat/product/${prdouctId}`;
    const requestBody = {
      closed: true
    };
    console.log(requestBody)

    return this.http.patch<Chat>(`${url}`, requestBody,{headers});
      
  }

  public patchUserCoins(ammount: number, userId: number,token:string): Observable<User> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    const url = `${this.CONFIG_URL}/user/${userId}/coin`;
    const requestBody = {
      coin: ammount
    };
    return this.http.patch<User>(url, requestBody,{headers});
  }
}
