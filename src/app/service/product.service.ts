import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CommonapiService } from '../../app/service/commonapi.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  controller: string = "Products";
  constructor(public http: HttpClient,
    private commonapiservice: CommonapiService) { }

  getAllProduct(categoryId): any {
    var dataToApi = {
      pageIndex: 0,
      limit: 100,
      lattitude: 12.1234,
      longitude: 45.3345,
      distanceWithInKm: 100000,
      sortCategory: 0,
      filter: {
        priceFilter: {
          minPric: 0,
          maxPrice: 0
        }
      }
    };
    const url = this.commonapiservice.getApiURL(this.controller, 'byCategory');
    const params = new HttpParams()
      .set('categoryId', categoryId);
    return this.http.put(url, dataToApi, { params });
  }

  saveData(dataToApi) {
    const url = this.commonapiservice.getApiURL(this.controller, '');
    return this.http.post(url, dataToApi,
      {
        headers: new HttpHeaders(
          {
            "content-Type": "application/json",
            "languageCode": "en"
          }
        )
      });
  }

}
