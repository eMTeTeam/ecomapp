import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

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
  private cartItemCount = new BehaviorSubject(0);
  constructor(public http: HttpClient) { }

  getCart() {
    return this.cart;
  }
  addProductToBasket(basketToApi) {
    //var basketURL = "http://mitaisapi.azurewebsites.net/api/Baskets/v1";
    var basketURL = "http://localhost:5000/api/Baskets/v1";
    return this.http.post(basketURL, basketToApi,
      {
        headers: new HttpHeaders(
          {
            "content-Type": "application/json"
          }
        )
      });
  }



  getCartItemCount() {
    //var basketCount = "http://mitaisapi.azurewebsites.net/api/Baskets/v1/itemCount";
    var basketCount = "http://localhost:5000/api/Baskets/v1/itemCount";
    return this.http.get(basketCount);
  }

  getBasketItems() {
    //var basketItems = "http://mitaisapi.azurewebsites.net/api/Baskets/v1";
    var basketItems = "http://localhost:5000/api/Baskets/v1";
    return this.http.get(basketItems,
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
    var saveURL = "http://localhost:5000/api/Baskets/v1";
    return this.http.put(saveURL, dataToApi,
      {
        headers: new HttpHeaders(
          {
            "content-Type": "application/json"
          }
        )
      });
  }

  decreaseProduct(dataToApi) {
    var saveURL = "http://localhost:5000/api/Baskets/v1";
    return this.http.put(saveURL, dataToApi,
      {
        headers: new HttpHeaders(
          {
            "content-Type": "application/json",
          }
        )
      });
  }

  removeProduct(basketId) {
    this.http.delete("http://localhost:5000/api/Baskets/v1/?basketItemId=" + basketId).subscribe(data => { });
  }

  /*** Dont delete this Methos will be reuse */
  buynowData(productId, quantity) {
    // var saveURL = "http://mitaisapi.azurewebsites.net/api/Inventories/v1/buyNow?productId=";
    var saveURL = "http://localhost:5000/api/Inventories/v1/buyNow?productId=";
    return this.http.post(saveURL + productId + '&quantity=' + quantity + "&addressId=08d7ef43-e9e5-43d8-8443-c4b5a74f7195",
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

  checkoutData(baseketitems) {
    const params = new HttpParams()
      .set('addressId', "08d7ef43-e9e5-43d8-8443-c4b5a74f7195");

    // var saveURL = "http://mitaisapi.azurewebsites.net/api/Inventories/v1/buyNow?productId=";
    var saveURL = "http://localhost:5000/api/Inventories/v1/checkouts";
    return this.http.post(saveURL, baseketitems, { params });
  }
}