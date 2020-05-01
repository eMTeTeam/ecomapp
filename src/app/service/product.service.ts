import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const baseUrl = 'http://localhost:5000/api/Products/v1/byCategory?categoryId=';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public http: HttpClient) { }

  getAllProduct(categoryId) {
    return this.http.get(baseUrl + categoryId + '&pageIndex=0&limit=10');
  }

  saveData(dataToApi) {
    var saveURL = "http://localhost:5000/api/Products/v1";
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
