import { Component, OnInit } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { SellmyproductlistService } from 'src/app/service/sellmyproductlist.service';
import { IonSlides } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-allproductslist',
  templateUrl: './allproductslist.page.html',
  styleUrls: ['./allproductslist.page.scss'],
})
export class AllproductslistPage {
  sellmyproductList: any;
  searchList: any;
  today: any;
  approvedData: any;
  rejectedData: any;
  savedData: any = "";
  price: string;
  noRecords: boolean = true;
  
  constructor(
    private menu: MenuController,
    private sellmyproductlistService: SellmyproductlistService,
    public loadingController: LoadingController,
    public actionSheetController: ActionSheetController,
    private alertCtrl: AlertController,
    public nav: NavController
  ) {
    this.presentLoading();
    this.allMyproductlist();
    this.searchList = this.sellmyproductList;
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

  viewProduct(item: any) {
    console.log(item);
    let navigationExtras: NavigationExtras = { state: { selectedProduct: item.id } };
    this.nav.navigateForward(['sellmyproductlist'], navigationExtras);
  }

  editProduct(item) {

  }

  approve(item: any) {
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

  goBack() {
    this.nav.navigateForward("account");
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

  allMyproductlist() {
    this.sellmyproductlistService.getAllmyproductlist().subscribe(
      data => {
        this.sellmyproductList = data;
        if(this.sellmyproductList.length>0)
        {
          this.noRecords=!this.noRecords;
        }
        this.searchList = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

}
