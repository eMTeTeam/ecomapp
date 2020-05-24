import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CommonapiService } from '../../app/service/commonapi.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  controller: string = "Products";
  controllerName: string = "ProductNames";
  constructor(public http: HttpClient,
    private commonapiservice: CommonapiService) { }

  getAllProductlist(categoryId,lati,longi): any {
    var dataToApi = {
      pageIndex: 0,
      limit: 100,
      lattitude: lati,
      longitude: longi,
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

  getAllProduct(productName): any {
    
    const url = this.commonapiservice.getApiURL(this.controllerName, 'search');
    const params = new HttpParams()
      .set('keyWord', productName)
      .set('pageIndex', "0" )
      .set('limit', "100");
    return this.http.get(url, { params });
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
