import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonapiService } from '../../app/service/commonapi.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  selectedCategory: any;
  controller: string = "ProductCategories";
  constructor(private http: HttpClient,
    private commonapiservice: CommonapiService) { }

  getAllCategories() {
    const url = this.commonapiservice.getApiURL(this.controller, '');
    return this.http.get(url);
  }

}