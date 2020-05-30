import { Component, OnInit } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, NavController, ModalController, AlertController } from '@ionic/angular';
import { Product, CartService } from 'src/app/service/cart.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-cartbasket',
  templateUrl: './cartbasket.page.html',
  styleUrls: ['./cartbasket.page.scss'],
})
export class CartbasketPage {

  cart: any;
  searchList: any;
  masterSelected: boolean;
  checkedList: any;
  checklist: any;
  savedData: any = "";
  total: number;
  loading: any;
  price: number = 0;
  quantity: number;
  basePrice: number;
  qty: number;
  addressList: any;
  addressId: any;
  isChecked: boolean;
  addressType: any;
  chkAddress: boolean = true;
  noRecords: boolean = false;
  buyNowDisabled = false;

  constructor(private menu: MenuController,
    public loadingController: LoadingController,
    public actionSheetController: ActionSheetController,
    public nav: NavController,
    public httpClient: HttpClient,
    private cartService: CartService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute) {
    this.cart = this.getBasketproducts();
    this.getmyAddresslist();
    this.checklist = this.cart;
    this.masterSelected = true;
  }

  checkUncheckAll() {
    if (this.cart.length > 0) {
      for (var i = 0; i < this.cart.length; i++) {
        this.cart[i].isSelected = this.masterSelected;
      }
      this.getCheckedItemList();
    }

  }

  isAllSelected() {
    this.masterSelected = this.cart.every(function (item: any) {
      return item.isSelected == true;
    })
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.total = 0;
    this.checkedList = [];
    for (var i = 0; i < this.cart.length; i++) {
      if (this.cart[i].isSelected)
        this.total += this.cart[i].price;
      this.checkedList.push(this.cart[i]);
    }
    this.getTotal(this.total);
    if (this.total > 0) {
      this.buyNowDisabled = false;

    }
    else {
      this.buyNowDisabled = true;
    }
  }

  checkEvent(list: any) {
    this.addressId = list.addressId;
    console.log(list.addressId);
  }

  async checkouts() {
    var d = [];
    for (var i = 0; i < this.checkedList.length; i++) {
      d.push(this.checkedList[i]["id"]);
    }
    if (d.length > 0) {
      this.cartService.checkoutData(d, this.addressId)
        .subscribe(
          (savedreturnData) => {
            this.savedData = JSON.stringify(savedreturnData);
            console.log(this.savedData);
          }
        )
    }
    else {
      console.log("No items selected");
    }
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'Order Placed Successfully',
      mode: 'ios',
      buttons: [
        {
          text: 'Okay',

          handler: () => {
            this.router.navigate(['/myorders']);
          }
        }
      ]
    });
    await alert.present().then(() => {
    });
  }

  //** Dont delete this method */
  buyNow() {
    for (var i = 0; i < this.checkedList.length; i++) {
      this.cartService.buynowData(this.checkedList[i].productId, this.checkedList[i].quantity).subscribe(
        (savedreturnData) => {
          this.savedData = JSON.stringify(savedreturnData);
          console.log(this.savedData);
        }
      )
    }
  }

  goback() {
    this.nav.navigateBack("sellerproductlist");
  }

  decreaseCartItem(p) {
    this.presentLoading();
    var dataToApi = {
      BasketItemId: p.id,
      Quantity: 1,
      UpdateAction: 1
    };
    this.cartService.decreaseProduct(dataToApi).subscribe(
      (savedreturnData) => {
        this.savedData = JSON.stringify(savedreturnData);
        console.log(this.savedData);
        this.getBasketproducts();
        this.getCheckedItemList();
      }
    )
  }

  increaseCartItem(item) {
    this.presentLoading();
    var dataToApi = {
      BasketItemId: item.id,
      Quantity: 1,
      UpdateAction: 0
    };
    this.cartService.addProduct(dataToApi).subscribe(
      (savedreturnData) => {
        this.savedData = JSON.stringify(savedreturnData);
        console.log(this.savedData);
        this.getBasketproducts();
        this.getCheckedItemList();
      }
    )
  }

  removeCartItem(p) {
    this.presentLoading();
    this.cartService.removeProduct(p.id).subscribe(
      (savedreturnData) => {
        this.savedData = JSON.stringify(savedreturnData);
        console.log(this.savedData);
        this.getBasketproducts();
        this.getCheckedItemList();
      }
    )
  }

  getTotal(total: number) {
    return total;
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Loading..',
      duration: 1000
    });
    await this.loading.present();
    const { role, data } = await this.loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      buttons: [{
        text: 'Cart',
        icon: 'cart',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Purchase',
        icon: 'pricetags',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: true
  };

  searchValue(value: any, args?: any): any {

    if (!value) return null;
    if (!args) return value;

    args = args.toLowerCase();

    return value.filter(function (item) {
      return JSON.stringify(item).toLowerCase().includes(args);
    });
  }

  openListPage() {
    this.nav.navigateForward("home");
  }

  openCartPage() {
    this.nav.navigateForward("cart");
  }

  openAccountPage() {
    this.nav.navigateForward("account");
  }

  getBasketproducts() {
    this.cartService.getBasketItems()
      .subscribe(
        data => {

          this.cart = data;
          this.cart.forEach((key) => {
            key["basePrice"] = key["price"];
          })
          if (this.cart.length > 0) {
            this.noRecords = !this.noRecords;
            this.checkUncheckAll();
          }
          else {
            this.nav.navigateBack("sellerproductlist");
          }
          console.log(data);
          this.loading.onDidDismiss();
        },
        error => {
          console.log(error);
        }
      );
  }

  getmyAddresslist() {
    this.accountService.getAddressList().subscribe(
      data => {

        this.addressList = data;
        for (let a = 0; a < this.addressList.length; a++) {
          if (this.addressList[a]["isDefault"] == true) {
            this.addressList = this.addressList[a];
            this.addressId = this.addressList["addressId"];
            this.addressType = this.addressList["addressType"];
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}