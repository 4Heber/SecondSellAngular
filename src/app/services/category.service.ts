import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Category } from 'src/app/models/category.model';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly CONFIG_URL = 'http://secondsell.randion.es/api';

  public categoryList: Category[] = []

  constructor(public http: HttpClient) {

  }

  public postCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.CONFIG_URL}/categories`, category)
  }

  public getCategories(): Observable<void> {
    return this.http.get<any>(`${this.CONFIG_URL}/categories`)
      .pipe(
        map(response => {
          const categoryArray = response.categories;
          this.categoryList = categoryArray;
        })
      );
  }


}
