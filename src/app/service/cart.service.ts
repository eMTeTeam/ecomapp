import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CommonapiService } from '../../app/service/commonapi.service';

export interface Product {
  ProductId: number;
  name: string;
  price: number;
  rating: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: any;
  productId: any;
  quantity: any;
  addressId: string;
  controllerBaskets: string = "Baskets";
  controllerInventories: string = "Inventories";
  constructor(public http: HttpClient,
    private commonapiservice: CommonapiService) { }

  getCart() {
    return this.cart;
  }

  addProductToBasket(basketToApi) {
    const url = this.commonapiservice.getApiURL(this.controllerBaskets, '');
    return this.http.post(url, basketToApi,
      {
        headers: new HttpHeaders(
          {
            "content-Type": "application/json"
          }
        )
      });
  }

  getCartItemCount() {
    const url = this.commonapiservice.getApiURL(this.controllerBaskets, 'itemCount');
    return this.http.get(url);
  }

  getBasketItems() {
    const url = this.commonapiservice.getApiURL(this.controllerBaskets, '');
    return this.http.get(url,
      {
        headers: new HttpHeaders(
          {
            "content-Type": "application/json",
            "languageCode": "en"
          }
        )
      });
  }

  addProduct(dataToApi) {
    const url = this.commonapiservice.getApiURL(this.controllerBaskets, '');
    return this.http.put(url, dataToApi,
      {
        headers: new HttpHeaders(
          {
            "content-Type": "application/json"
          }
        )
      });
  }

  decreaseProduct(dataToApi) {
    const url = this.commonapiservice.getApiURL(this.controllerBaskets, '');
    return this.http.put(url, dataToApi,
      {
        headers: new HttpHeaders(
          {
            "content-Type": "application/json",
          }
        )
      });
  }

  removeProduct(basketId) {
    const url = this.commonapiservice.getApiURL(this.controllerBaskets, '?basketItemId=');
    this.http.delete(url + basketId).subscribe(data => { });
  }

  /*** Dont delete this Methos will be reuse */
  buynowData(productId, quantity) {
    const url = this.commonapiservice.getApiURL(this.controllerInventories, 'buyNow?productId=');
    return this.http.post(url + productId + '&quantity=' + quantity + "&addressId=08d7ef43-e9e5-43d8-8443-c4b5a74f7195",
      {
        httpparams: new HttpParams(
          {
            fromObject: {
              "productId": productId,
              "quantity": quantity,
              "addressId": "08d7ef43-e9e5-43d8-8443-c4b5a74f7195"
            }
          }
        )
      });
  }

  checkoutData(baseketitems,addressId) {
    const url = this.commonapiservice.getApiURL(this.controllerInventories, 'checkouts');
    const params = new HttpParams()
      .set('addressId', addressId);
    return this.http.post(url, baseketitems, { params });
  }
}