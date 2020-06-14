import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CommonapiService } from '../../app/service/commonapi.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  controller: string = "Products";
  controllerName: string = "ProductNames";
  controllerNameFile: string = "Files";
  constructor(public http: HttpClient,
    private commonapiservice: CommonapiService) { }

  getAllProductlist(categoryId, lati, longi): any {
    var dataToApi = {
      pageIndex: 0,
      limit: 100,
      lattitude: lati,
      longitude: longi,
      sortCategory: 0,
      filter: {
        priceFilter: {
          minPric: 0,
          maxPrice: 1000
        }
      }
    };
    const url = this.commonapiservice.getApiURL(this.controller, 'byCategory');
    const params = new HttpParams()
      .set('categoryId', categoryId);
    return this.http.put(url, dataToApi, { params });
  }

  getEditProduct(productId) {
    const url = this.commonapiservice.getApiURL(this.controller, 'byId');
    const params = new HttpParams()
      .set('productId', productId)
    return this.http.get(url, { params });
  }

  getAllProduct(productName): any {

    const url = this.commonapiservice.getApiURL(this.controllerName, 'search');
    const params = new HttpParams()
      .set('keyWord', productName)
      .set('pageIndex', "0")
      .set('limit', "100");
    const headers = new HttpHeaders()
      .append('languageCode', "en")
      .append('countryCode', "in");
    //  const options = new new RequestOptions({ headers: headers, params: params });
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

  updateProduct(dataToApi) {
    const url = this.commonapiservice.getApiURL(this.controller, '');
    return this.http.put(url, dataToApi,
      {
        headers: new HttpHeaders(
          {
            "content-Type": "application/json",
            "languageCode": "en"
          }
        )
      });
  }


  saveImage(formData) {
    const url = this.commonapiservice.getApiURL(this.controllerNameFile, '');
    return this.http.post(url, formData,
      {
        headers: new HttpHeaders(
          {
            "content-Type": "multipart/form-data",
            //  "accept": "application/json"
          }
        )
      });
  }

}
