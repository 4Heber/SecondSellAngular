import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly CONFIG_URL = 'http://secondsell.randion.es/api';

  public productList: Product[] = []

  constructor(public http: HttpClient) { }

  public postProduct(product: Product,token:string): Observable<Product> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<Product>(`${this.CONFIG_URL}/products`, product,{headers})
  }

  public getProducts(): Observable<void> {
    return this.http.get<Product[]>(`${this.CONFIG_URL}/products`)
      .pipe(map(((res: any) => {
        res.forEach((product: any) => {
          product.photo = JSON.parse(product.photo!);
        });
        this.productList = res
      })))
  }

  public getProductsByUserId(userId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.CONFIG_URL}/user/${userId}/products`)
  }

  public getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.CONFIG_URL}/products/${id}`)
  }

  public patchProductCart(productId: number) {
    const url = `${this.CONFIG_URL}/products/${productId}`
    const requestBody = {
      active: false
    };
    return this.http.patch<Product>(url, requestBody)
  }
}
