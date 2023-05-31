import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Category } from 'src/app/models/category.model';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // URL API
  private readonly CONFIG_URL = 'http://localhost:3000';

  // ARRAY DE CategoryOS
  public categoryList: Category[] = []

  constructor(public http: HttpClient) {

  }

  // FUNCIÓN PARA HACER POST DE UN CategoryO
  public postCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.CONFIG_URL}/categories`, category)
  }

  // FUNCIÓN PARA OBTENER LOS CategoryOS Y ALMACENARLOS EN LA VAR PRIVADA
  public getCategories(): Observable<void> {
    return this.http.get<Category[]>(`${this.CONFIG_URL}/categories`)
      .pipe(map(((Categorys: Category[]) => {
        this.categoryList = Categorys
      })))
  }

}
