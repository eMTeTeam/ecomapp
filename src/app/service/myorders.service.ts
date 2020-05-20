import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CommonapiService } from '../../app/service/commonapi.service';

@Injectable({
  providedIn: 'root'
})
export class MyordersService {
  controller: string = "Inventories";
  constructor(private http: HttpClient,
    private commonapiservice: CommonapiService) { }

  getAllmyorders(): any {
    const url = this.commonapiservice.getApiURL(this.controller, '');
    const headers = new HttpHeaders()
      .set('languageCode', "en");
    return this.http.get(url, { headers });
  }

}
