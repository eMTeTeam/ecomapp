import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonapiService } from '../../app/service/commonapi.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  controller: string = "Address";
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
}
