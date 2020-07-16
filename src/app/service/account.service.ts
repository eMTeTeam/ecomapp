import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CommonapiService } from '../../app/service/commonapi.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  controller: string = "Address";
  usercontroller: string = "Users";
  reviewcontroller: string = "Reviews";
  constructor(public http: HttpClient,
    private commonapiservice: CommonapiService) { }

  saveAddress(dataToApi) {
    const url = this.commonapiservice.getApiURL(this.controller, '');
    return this.http.post(url, dataToApi,
      {
        headers: new HttpHeaders(
          {
            "content-Type": "application/json"
          }
        )
      });
  }

  getAddressList() {
    const url = this.commonapiservice.getApiURL(this.controller, '');
    return this.http.get(url);
  }
  getProfile() {
    const url = this.commonapiservice.getApiURL(this.usercontroller, '');
    return this.http.get(url);
  }
  getReviews(useId) {
    const params = new HttpParams()
      .set('userId', useId)
      .set('isSellerReview', "true")
    const url = this.commonapiservice.getApiURL(this.reviewcontroller, 'ratings');
    return this.http.get(url, {params});
  }
}
