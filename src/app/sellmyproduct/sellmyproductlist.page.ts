import { Component, OnInit } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { SellmyproductlistService } from 'src/app/service/sellmyproductlist.service';
import { IonSlides } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-sellmyproductlist',
  templateUrl: './sellmyproductlist.page.html',
  styleUrls: ['./sellmyproductlist.page.scss'],
})
export class SellmyproductlistPage {
  sellmyproductList: any;
  searchQuery: string;
  searchList: any;
  today: any;
  approvedData: any;
  rejectedData: any;
  constructor(
    private menu: MenuController,
    private sellmyproductlistService: SellmyproductlistService,
    public loadingController: LoadingController,
    public actionSheetController: ActionSheetController,
    private alertCtrl: AlertController,
    public nav: NavController
  ) {
    this.presentLoading();
    this.getSellmyproductlist();
    this.searchList = this.sellmyproductList;
    // this.today = Date.now();
    this.today = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
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

  addNewProduct() {
    this.nav.navigateForward("sellmyproduct");
  }

  approve(item: any) {
    //  this.cartService.addProduct(item);
    var approveApi = {
      InventoryItemId: item.id,
      ETA: this.today

    };
    this.sellmyproductlistService.approveItem(approveApi).subscribe(
      (savedreturnapprovedItem) => {
        this.approvedData = JSON.stringify(savedreturnapprovedItem);
        console.log(this.approvedData);
      }
    )
  }
  async rejectAlert(item: any) {
    const alert = await this.alertCtrl.create({
      header: 'Enter Your Comments',
      inputs: [
        {
          name: 'comments',
          type: 'text',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Apply',
          handler: (comValue) => this.reject(item.id, comValue.comments)
        }
      ]
    });
    await alert.present();
  }
  reject(itemid: any, rejComments: any) {
    //  this.cartService.addProduct(item);
    var rejectApi = {
      InventoryItemId: itemid,
      Comments: rejComments

    };
    this.sellmyproductlistService.rejectItem(rejectApi).subscribe(
      (savedreturnrejectedItem) => {
        this.rejectedData = JSON.stringify(savedreturnrejectedItem);
        console.log(this.rejectedData);
      }
    )
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

  searchText(text) {
    this.searchList = this.searchValue(this.sellmyproductList, text);
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

  getSellmyproductlist() {
    this.sellmyproductlistService.getSellmyproductlist()
      .subscribe(
        data => {
          this.sellmyproductList = data;
          this.searchList = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }
}
