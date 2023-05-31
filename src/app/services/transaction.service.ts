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
  // URL API
  private readonly CONFIG_URL = 'http://localhost:3000';

  // ARRAY DE OFERTAS
  public cartList: Cart[] = []
  public cart: Cart = {} as Cart
  public productCartList: ProductCart[] = []
  public productCart: ProductCart = {} as ProductCart
  constructor(public http: HttpClient) {

  }

  // FUNCIÓN PARA HACER POST DE UNA OFERTA
  public postProductCart(offer: Offer, cartId: number, prodcutID: number): Observable<ProductCart> {
    return this.http.post<ProductCart>(`${this.CONFIG_URL}/productCart`, {
      productId: prodcutID,
      price: offer.price,
      cartId: cartId
    })
  }

  // FUNCIÓN PARA OBTENER LAS OFERTAS Y ALMACENARLOS EN LA VAR PRIVADA
  public getCarts(): Observable<void> {
    return this.http.get<Cart[]>(`${this.CONFIG_URL}/carts`)
      .pipe(map(((cart: Cart[]) => {
        this.cartList = cart
      })))
  }

  // FUNCIÓN PARA OBTENER LAS OFERTAS Y ALMACENARLOS EN LA VAR PRIVADA
  public getCart(userId: number): Observable<void> {
    return this.http.get<Cart>(`${this.CONFIG_URL}/cart/?userId=${userId}&_sort=id&_order=desc&_limit=1`).pipe(map(((cart: any) => {
      if (cart[0])
        this.cart = cart[0]
    })))

  }
  public getProductCart(cartId: number, offer: Offer, prodcutID: number): Observable<void> {
    return this.http.get<ProductCart>(`${this.CONFIG_URL}/productCart/?cartId=${cartId}&productId=${prodcutID}&_sort=id&_order=desc&_limit=1`)
      .pipe(map(((productCart: any) => {
        this.productCart = productCart[0]
      })))
  }
  public postCart(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(`${this.CONFIG_URL}/cart`, cart)
  }
  public postOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.CONFIG_URL}/order`, order)
  }
  public getProductsCart(cartId: number): Observable<void> {
    return this.http.get<ProductCart[]>(`${this.CONFIG_URL}/productCart/?cartId=${cartId}`)
      .pipe(map(((productCart: ProductCart[]) => {
        this.productCartList = productCart
      })))
  }

  public patchProductCart(cartId: number, offer: Offer, productId: number): Observable<ProductCart> {
    const url = `${this.CONFIG_URL}/productCart/?cartId=${cartId}&productId=${productId}`;

    const requestBody = {
      productId: productId,
      price: offer.price
    };

    return this.http.get<ProductCart[]>(url).pipe(
      switchMap((product: ProductCart[]) => {

        if (Array.isArray(product) && product.length > 0) {
          // Modificar el primer valor del array
          product[0].price = offer.price;

          return this.http.patch<ProductCart>(`${this.CONFIG_URL}/productCart/${product[0].id}`, requestBody);
        }

        return throwError('No se encontró ningún producto en el carrito.');
      })
    );
  }

  public patchChat(state: boolean, userId: number, prdouctId: number): Observable<Chat> {
    const url = `${this.CONFIG_URL}/chats/?emit=${userId}&productID=${prdouctId}`;
    console.log(url)
    const requestBody = {
      closed: state
    };
    return this.http.get<Chat[]>(url).pipe(
      switchMap((chat: Chat[]) => {

        if (Array.isArray(chat) && chat.length > 0) {
          ;

          return this.http.patch<Chat>(`${this.CONFIG_URL}/chats/${chat[0].id}`, requestBody);
        }

        return throwError('No se encontró ningún chat');
      })
    );
  }
  public patchUserCoins(ammount: number, userId: number): Observable<User> {
    const url = `${this.CONFIG_URL}/users/${userId}`;
    const requestBody = {
      coins: ammount
    };
    return this.http.patch<User>(url, requestBody);
  }
}
