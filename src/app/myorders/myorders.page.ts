import { Component, OnInit } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { MyordersService } from 'src/app/service/myorders.service';
import { IonSlides } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.page.html',
  styleUrls: ['./myorders.page.scss'],
})
export class MyordersPage {
  productList: any;
  searchQuery: string;
  searchList: any;
  savedData: any = "";
  noRecords: boolean = true;
  loading:any;
  constructor(
    private menu: MenuController,
    private myordersService: MyordersService,
    public loadingController: LoadingController,
    public actionSheetController: ActionSheetController,
    private alertCtrl: AlertController,
    public nav: NavController
  ) {
    this.presentLoading();
    this.allMyproductlist();
    this.searchList = this.productList;
  }
  ionViewWillEnter() {
    this.presentLoading();
    this.allMyproductlist();
  }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
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
          this.openCartPage();
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

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  searchValue(value: any, args?: any): any {
    if (!value) return null;
    if (!args) return value;
    args = args.toLowerCase();
    return value.filter(function (item) {
      return JSON.stringify(item).toLowerCase().includes(args);
    });
  }

  goBack() {
    this.nav.navigateBack("account");
  }

  searchText(text) {
    this.searchList = this.searchValue(this.productList, text);
  }

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
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

  allMyproductlist() {
    this.myordersService.getAllmyorders().subscribe(
      data => {
        this.productList = data;
        if (this.productList.length > 0) {
          this.noRecords = !this.noRecords;
        }
        this.searchList = data;
        this.loading.onDidDismiss();
      },
      error => {
        console.log(error);
      }
    );
  }

  viewOrders(item) {
    let navigationExtras: NavigationExtras = { state: { selectedProduct: [item] } };
    this.nav.navigateForward(['myordersdetail'], navigationExtras);
  }

}