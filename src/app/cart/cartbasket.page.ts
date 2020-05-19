import { Component, OnInit } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, NavController, ModalController, AlertController } from '@ionic/angular';
import { Product, CartService } from 'src/app/service/cart.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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
  total: number = 0;
  price: number = 0;
  quantity: any;

  constructor(private menu: MenuController,
    public loadingController: LoadingController,
    public actionSheetController: ActionSheetController,
    public nav: NavController,
    public httpClient: HttpClient,
    private cartService: CartService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private route: ActivatedRoute) {
    this.cart = this.getBasketproducts();
    this.checklist = this.cart;
    this.masterSelected = true;
  }

  checkUncheckAll() {
    for (var i = 0; i < this.cart.length; i++) {
      this.cart[i].isSelected = this.masterSelected;
    }
    this.total = 0;
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.masterSelected = this.cart.every(function (item: any) {
      return item.isSelected == true;
    })
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.cart.length; i++) {
      if (this.cart[i].isSelected)
        this.total += this.cart[i].price;
      this.checkedList.push(this.cart[i]);
    }
  }

  async checkouts() {
    var d = [];
    for (var i = 0; i < this.checkedList.length; i++) {
      d.push(this.checkedList[i]["id"]);
    }
    if (d.length > 0) {
      this.cartService.checkoutData(d)
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
      message: 'Order Placed Successfully',
      buttons: [
        {
          text: 'OK',

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
    var dataToApi = {
      BasketItemId: p.id,
      Quantity: 1,
      UpdateAction: 1
    };
    this.cartService.decreaseProduct(dataToApi).subscribe(
      (savedreturnData) => {
        this.savedData = JSON.stringify(savedreturnData);
        console.log(this.savedData);
      }
    )
  }

  increaseCartItem(p) {
    var dataToApi = {
      BasketItemId: p.id,
      Quantity: 1,
      UpdateAction: 0
    };
    this.cartService.addProduct(dataToApi).subscribe(
      (savedreturnData) => {
        this.savedData = JSON.stringify(savedreturnData);
        console.log(this.savedData);
      }
    )
  }

  removeCartItem(p) {
    this.cartService.removeProduct(p.id);
  }

  getTotal() {
    return this.total;
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading..',
      duration: 1000
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
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
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }
}