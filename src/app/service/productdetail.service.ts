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

  getProductdetail(keyWord): any {
    var dataToApi = {
      pageIndex: 0,
      limit: 10,
      lattitude: 12.1234,
      longitude: 45.3345,
      distanceWithInKm: 100000,
      sortCategory: 0
    };
    const url = this.commonapiservice.getApiURL(this.controller, 'search');
    const params = new HttpParams()
      .set('keyWord', keyWord);
    return this.http.put(url, dataToApi, { params });
  }

}
