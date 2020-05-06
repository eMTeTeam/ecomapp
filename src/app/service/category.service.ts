import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://mitaisapi.azurewebsites.net/api/ProductCategories/v1';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  selectedCategory: any;

  constructor(private http: HttpClient) { }
  getAllCategories() {
    return this.http.get(baseUrl);
  }
}