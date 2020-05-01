import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:5000/api/Products/v1/search?keyWord=';

@Injectable({
  providedIn: 'root'
})
export class ProductdetailService {

  constructor(private http: HttpClient) { }

  getProductdetail(keyWord) {
    return this.http.get(baseUrl + keyWord + '&pageIndex=0&limit=10');
  }
}
