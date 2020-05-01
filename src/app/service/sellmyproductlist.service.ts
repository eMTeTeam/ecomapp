import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:5000/api/Inventories/v1/selling';

@Injectable({
  providedIn: 'root'
})
export class SellmyproductlistService {

  constructor(private http: HttpClient) { }
  getSellmyproductlist() {
    return this.http.get(baseUrl);
  }
}