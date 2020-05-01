import { Component, OnInit } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, NavController, ModalController, AlertController } from '@ionic/angular';
import { Product, CartService } from 'src/app/service/cart.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {

  cart: any;
  productList: any;
  categoryList: any;
  searchQuery: string;
  searchList: any;
  masterSelected: boolean=true;
  checkedList: any;
  checklist: any;
  savedData: any = "";
  prId: any;

  private currentNumber = 1;

  private increment() {
    this.currentNumber++;
  }

  private decrement() {
    this.currentNumber--;
    if (this.currentNumber < 1) {
      this.currentNumber = 1
    }
  }

  constructor(private menu: MenuController,
    public loadingController: LoadingController,
    public actionSheetController: ActionSheetController,
    public nav: NavController,
    public httpClient: HttpClient,
    private cartService: CartService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.masterSelected = false;
    this.cart = this.cartService.getCart();
    this.checklist = this.cart;
    this.getCheckedItemList();
    //this.isAllSelected();
  }

  buttonState() {
    return !this.checklist.some(_ => _.isSelected);
  }

  checkUncheckAll() {
    for (var i = 0; i < this.checklist.length; i++) {
      this.checklist[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.masterSelected = this.checklist.every(function (item: any) {
      return item.isSelected == true;
    })
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedList = [];
    this.checklist = this.cart.map(elm => ({ productId: elm.id, 
      Price: elm.price, 
      ProductName: elm.name, 
      Image: elm.imageUrl, 
      Rating: elm.rating, 
      NumberOfRatings: elm.numberOfRatings, 
      Userid: elm.userId, 
      isSelected: elm.isSelected }))
    for (var i = 0; i < this.checklist.length; i++) {
      if (this.checklist[i].isSelected)
        this.checkedList.push(this.checklist[i]);
    }
    this.checkedList = JSON.stringify(this.checkedList);
    this.prId = this.checkedList.id;
    console.log(this.checkedList);
  }

  buyNow() {
    var dataToApi = this.checkedList;
    // var dataToApi = {
    //   ProductId: this.prId,
    //   Price: this.checkedList.price,
    //   Quantity: 7,
    //   SellerId: "Karthik0",
    //   BuyerId: "Karthik0",
    //   StatusId: "a2c85f54-621e-4110-91c3-026b36d9ce54"

    // };
    this.cartService.buynowData(dataToApi).subscribe(
      (savedreturnData) => {
        this.savedData = JSON.stringify(savedreturnData);
        console.log(this.savedData);
      }
    )
  }

  goback() {
    this.nav.navigateBack("home");
  }

  decreaseCartItem(product) {
    this.cartService.decreaseProduct(product);
  }

  increaseCartItem(product) {
    this.cartService.addProduct(product);
  }

  removeCartItem(product) {
    this.cartService.removeProduct(product);
  }

  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.rating, 0);
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

  searchText(text) {
    this.searchList = this.searchValue(this.productList, text);
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

  async checkout() {
    let alert = await this.alertCtrl.create({
      header: 'Thanks for your Order!',
      message: 'We will deliver your products as soon as possible. Total amount is ₹ ' + this.getTotal(),
      buttons: ['OK']

    });
    alert.present().then(() => {
      this.modalCtrl.dismiss();
    });
  }
}
