import { Component, OnInit } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { SellmyproductlistService } from 'src/app/service/sellmyproductlist.service';
import { IonSlides } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { NavigationExtras } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';
import { Router } from '@angular/router';

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
  searchQuery:any;
  noRecords: boolean = true;
  loading: any;
  addressList: any;
  ishiddennorecords = true;
  ishidden = true;
  unitName: any;
  constructor(
    private menu: MenuController,
    private sellmyproductlistService: SellmyproductlistService,
    public loadingController: LoadingController,
    public actionSheetController: ActionSheetController,
    private alertCtrl: AlertController,
    public nav: NavController,
    private router: Router,
    private accountService: AccountService
  ) {
    this.allMyproductlist();
    this.searchList = this.sellmyproductList;
    this.today = formatDate(new Date(), 'yyyy-MM-dd', 'en');
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

  async addNewProduct() {
    this.getmyAddresslist();
  }

  viewProduct(item: any) {
    console.log(item);
    let navigationExtras: NavigationExtras = { state: { selectedProduct: item.id } };
    this.nav.navigateForward(['sellmyproductlist'], navigationExtras);
  }

  editProduct(item) {
    let navigationExtras: NavigationExtras = { state: { selectedProduct: item.id } };
    this.nav.navigateForward(['sellmyproduct'], navigationExtras);
  }
  async getmyAddresslist() {
    this.accountService.getAddressList().subscribe(
      async data => {
        this.addressList = data;
        console.log(data);
        if (this.addressList.length > 0) {
          this.nav.navigateForward("sellmyproduct");
        }
        else {

          const alert = this.alertCtrl.create({
            header: 'Request!',
            message: 'Please add Address before add products',
            mode: 'ios',
            buttons: [
              {
                text: 'Okay',

                handler: () => {
                  this.router.navigate(['/address']);
                }
              }
            ]
          });
          await (await alert).present().then(() => {
          });
        }
      },
      error => {
        console.log(error);
      }
    );

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

  goback() {
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
        if (this.sellmyproductList.length == 0) {
          this.ishiddennorecords = false;
          this.ishidden = true;
        }
        else {
          this.ishidden = false;
          this.ishiddennorecords = true;
          this.searchList = data;
          for (let u = 0; u < this.searchList.length; u++) {
            this.unitName = this.searchList[u]["unitName"];
            if (this.unitName == "Gram") {
              this.searchList[u]["unitName"] = "Kg";
            }
            else if (this.unitName == "MilliLitre") {
              this.searchList[u]["unitName"] = "Litre";
            }
          }
        }

        this.loading.onDidDismiss();
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

}
