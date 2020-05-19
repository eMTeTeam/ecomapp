import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const baseUrl = 'http://localhost:5000/api/Products/v1/byCategory';
//const baseUrl = 'http://mitaisapi.azurewebsites.net/api/Products/v1/byCategory?categoryId=';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public http: HttpClient) { }

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
    const params = new HttpParams()
      .set('categoryId', categoryId);
    return this.http.put(baseUrl, dataToApi, { params });
  }

  saveData(dataToApi) {
    var saveURL = "http://localhost:5000/api/Products/v1";
    //var saveURL = "http://mitaisapi.azurewebsites.net/api/ProductCategories/v1";
    return this.http.post(saveURL, dataToApi,
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
