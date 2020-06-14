import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { CommonapiService } from '../../app/service/commonapi.service';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  controller: string = "Notifications";
  constructor(public http: HttpClient,
    private commonapiservice: CommonapiService) { }

    getreceivedList() {
      const params = new HttpParams()
      .set('pageIndex', "0")
      .set('limit', "100");
      const url = this.commonapiservice.getApiURL(this.controller, 'received');
      return this.http.get(url,{params});
    }
}
