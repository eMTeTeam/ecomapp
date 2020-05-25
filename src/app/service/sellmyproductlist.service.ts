import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CommonapiService } from '../../app/service/commonapi.service';

@Injectable({
  providedIn: 'root'
})
export class SellmyproductlistService {
  controllerInventories: string = "Inventories";
  controllerProducts: string = "Products";
  constructor(private http: HttpClient,
    private commonapiservice: CommonapiService) { }

  getSellmyproductlist(productId) {
    const params = new HttpParams()
    .set('productId', productId);
    const url = this.commonapiservice.getApiURL(this.controllerInventories, 'sellingByProduct');
    return this.http.get(url, { params });
  }

  getAllmyproductlist(): any {
    // var dataToApi = {
    //   pageIndex: 0,
    //   limit: 100,
    //   lattitude: 12.961735843534306,
    //   longitude: 79.1748045757413,
    //   distanceWithInKm: 100000,
    //   sortCategory: 0
    // };
    const url = this.commonapiservice.getApiURL(this.controllerProducts, 'selling');
    const params = new HttpParams()
    .set('pageIndex', "0")
    .set('limit', "100");
    const headers = new HttpHeaders()
      .set('languageCode', "en");
      return this.http.get(url, { params });
   // return this.http.put(url, dataToApi, { headers })
  }

  updatemyProduct(updateData): any {
    const url = this.commonapiservice.getApiURL(this.controllerProducts, '');
    const headers = new HttpHeaders()
      .set('languageCode', "en");
    return this.http.put(url, updateData, { headers })
  }

  approveItem(approveApi) {
    const url = this.commonapiservice.getApiURL(this.controllerInventories, 'approve');
    return this.http.put(url, approveApi);
  }

  rejectItem(rejectApi) {
    const url = this.commonapiservice.getApiURL(this.controllerInventories, 'reject');
    return this.http.put(url, rejectApi);
  }
}