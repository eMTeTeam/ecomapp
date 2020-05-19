import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

//const baseUrl = 'http://mitaisapi.azurewebsites.net/api/Inventories/v1/selling';
const baseUrl = 'http://localhost:5000/api/Inventories/v1/selling';

@Injectable({
  providedIn: 'root'
})
export class SellmyproductlistService {

  constructor(private http: HttpClient) { }

  getSellmyproductlist() {
    return this.http.get(baseUrl);
  }

  getAllmyproductlist(): any {
    var dataToApi = {
      pageIndex: 0,
      limit: 10,
      lattitude: 12.1234,
      longitude: 45.3345,
      distanceWithInKm: 100000,
      sortCategory: 0
    };
    const headers = new HttpHeaders()
      .set('languageCode', "en");
    var saveURL = "http://localhost:5000/api/Products/v1/getProducts";
    return this.http.put(saveURL, dataToApi, { headers })
  }

  updatemyProduct(updateData): any {
    const headers = new HttpHeaders()
      .set('languageCode', "en");
    var saveURL = "http://localhost:5000/api/Products/v1";
    return this.http.put(saveURL, updateData, { headers })
  }

  approveItem(approveApi) {
    //var approveURL ="http://mitaisapi.azurewebsites.net/api/Inventories/v1/approve";
    var approveURL = "http://localhost:5000/api/Inventories/v1/approve";
    return this.http.put(approveURL, approveApi);
  }

  rejectItem(rejectApi) {
    // var rejectURL ="http://mitaisapi.azurewebsites.net/api/Inventories/v1/reject";
    var rejectURL = "http://localhost:5000/api/Inventories/v1/reject";
    return this.http.put(rejectURL, rejectApi);
  }
}