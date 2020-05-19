import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

//const baseUrl = 'http://mitaisapi.azurewebsites.net/api/Products/v1/search?keyWord=';
const baseUrl = 'http://localhost:5000/api/Products/v1/search';

@Injectable({
  providedIn: 'root'
})
export class ProductdetailService {

  constructor(private http: HttpClient) { }

  getProductdetail(keyWord): any {
    var dataToApi = {
      pageIndex: 0,
      limit: 10,
      lattitude: 12.1234,
      longitude: 45.3345,
      distanceWithInKm: 100000,
      sortCategory: 0
    };
    const params = new HttpParams()
      .set('keyWord', keyWord);
    return this.http.put(baseUrl, dataToApi, { params });
  }

}
