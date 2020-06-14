import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CommonapiService } from '../../app/service/commonapi.service';

@Injectable({
  providedIn: 'root'
})
export class ProductdetailService {
  controller: string = "Products";
  constructor(private http: HttpClient,
    private commonapiservice: CommonapiService) { }

  getProductdetail(keyWord,lati,longi,filter,sort): any {
    // var dataToApi = {
    //   pageIndex: 0,
    //   limit: 100,
    //   lattitude: lati,
    //   longitude: longi,
    //   distanceWithInKm: 100000,
    //   sortCategory: 0,
    //   filterPrice
    // };
    var dataToApi = {
      pageIndex: 0,
      limit: 100,
      lattitude: lati,
      longitude: longi,
      distanceWithInKm: 100000,
      sortCategory: sort,
      filter
      // "filter": {
      //   "priceFilter": {
      //     "minPrice": 0,
      //     "maxPrice": 80
      //   }
      // }
    };
    const url = this.commonapiservice.getApiURL(this.controller, 'search');
    const params = new HttpParams()
      .set('keyWord', keyWord);
    return this.http.put(url, dataToApi, { params });
  }

}
