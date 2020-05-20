import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CommonapiService } from '../../app/service/commonapi.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  controllerReviews: string = "Reviews";
  controllerInventories: string = "Inventories";
  constructor(public http: HttpClient,
    private commonapiservice: CommonapiService) { }

  sellerReview(dataToApi) {
    const url = this.commonapiservice.getApiURL(this.controllerReviews, 'sellerReview');
    return this.http.post(url, dataToApi,
      {
        headers: new HttpHeaders(
          {
            "content-Type": "application/json",
          }
        )
      });
  }

  buyerReview(dataToApi) {
    const url = this.commonapiservice.getApiURL(this.controllerInventories, 'sellerDelivered');
    return this.http.put(url, dataToApi,
      {
        headers: new HttpHeaders(
          {
            "content-Type": "application/json",
          }
        )
      });
  }

}
