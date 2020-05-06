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

  approveItem(approveApi) {
    var approveURL ="http://localhost:5000/api/Inventories/v1/approve";
    return this.http.put(approveURL,approveApi);
  }

  rejectItem(rejectApi) {
    var rejectURL ="http://localhost:5000/api/Inventories/v1/reject";
    return this.http.put(rejectURL,rejectApi);
  }
}