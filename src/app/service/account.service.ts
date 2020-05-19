import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(public http: HttpClient) { }

  saveAddress(dataToApi) {
    var saveURL = "http://localhost:5000/api/Address/v1";
    return this.http.post(saveURL, dataToApi,
      {
        headers: new HttpHeaders(
          {
            "content-Type": "application/json"
          }
        )
      });
  }

  getAddressList() {
   var baseUrl="http://localhost:5000/api/Address/v1"
    return this.http.get(baseUrl);
  }
}
