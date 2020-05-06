import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';

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
  //private cart = [];
  private cartItemCount = new BehaviorSubject(0);
  constructor(public http: HttpClient) { }

  getCart() {
    return this.cart;
  }
  addProductToBasket(basketToApi) {
    var basketURL = "http://localhost:5000/api/Baskets/v1";
    return this.http.post(basketURL, basketToApi,
      {
        headers: new HttpHeaders(
          {
            "content-Type": "application/json"
          }
        )
      });
    //this.cartItemCount.next(this.cartItemCount.value + 1);
    //this.cart.push(basketToApi);
  }



  getCartItemCount() {
    var basketCount = "http://localhost:5000/api/Baskets/v1/itemCount";
    return this.http.get(basketCount);
  }

  getBasketItems() {
    var basketItems = "http://localhost:5000/api/Baskets/v1";
    return this.http.get(basketItems,
      {
        headers: new HttpHeaders(
          {
            "content-Type": "application/json",
            "languageCode":"en"
          }
        )
      });
    }
  // getCartItemCount() {
  //   return this.cartItemCount;
  // }

  addProduct(product) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === product.id) {
        p.rating += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      product.rating += 1;
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }

  decreaseProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.rating -= 1;
        if (p.rating == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  removeProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.rating);
        this.cart.splice(index, 1);
      }
    }
  }

  buynowData(productId,quantity) {
    //http://localhost:5000/api/Inventories/v1/buyNow?productId=0e69b5c1-efad-4e54-ae31-3a501ffdc97d&quantity=2&addressId=7d98f860-8af5-11ea-b8f7-020361373239
    
    var saveURL = "http://localhost:5000/api/Inventories/v1/buyNow?productId=";
    return this.http.post(saveURL + productId + '&quantity=' + quantity + "&addressId=08d7ef43-e9e5-43d8-8443-c4b5a74f7195",
      {
        httpparams: new HttpParams(
          {
            fromObject:{
            "productId": productId,
            "quantity":quantity,
            "addressId":"08d7ef43-e9e5-43d8-8443-c4b5a74f7195"
            }
          }
        )
      });
  }
}