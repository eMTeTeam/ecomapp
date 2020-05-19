import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyordersService {

  constructor(private http: HttpClient) { }

  getAllmyorders(): any {
    const headers = new HttpHeaders()
      .set('languageCode', "en");
    var saveURL = "http://localhost:5000/api/Inventories/v1";
    return this.http.get(saveURL, { headers });
  }

}
