import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(public http: HttpClient) { }

  sellerReview(dataToApi) {
    var saveURL = "http://localhost:5000/api/Reviews/v1/sellerReview";
    //var saveURL = "http://mitaisapi.azurewebsites.net/api/ProductCategories/v1";
    return this.http.post(saveURL, dataToApi,
      {
        headers: new HttpHeaders(
          {
            "content-Type": "application/json",
          }
        )
      });
  }

  buyerReview(dataToApi) {
    var saveURL = "http://localhost:5000/api/Inventories/v1/sellerDelivered";
    //var saveURL = "http://mitaisapi.azurewebsites.net/api/ProductCategories/v1";
    return this.http.put(saveURL, dataToApi,
      {
        headers: new HttpHeaders(
          {
            "content-Type": "application/json",
          }
        )
      });
  }


}
