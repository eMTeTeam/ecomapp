import { Component, OnInit } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, NavController, AlertController, ModalController } from '@ionic/angular';
import { SellmyproductlistService } from 'src/app/service/sellmyproductlist.service';
import { IonSlides } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { ReviewsService } from 'src/app/service/reviews.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewModalPage } from 'src/app/sellmyproduct/review-modal/review-modal.page'


@Component({
  selector: 'app-sellmyproductlist',
  templateUrl: './sellmyproductlist.page.html',
  styleUrls: ['./sellmyproductlist.page.scss'],
})
export class SellmyproductlistPage {
  sellmyproductList: any;
  selectedProduct: any;
  searchList: any;
  today: any;
  approvedData: any;
  rejectedData: any;
  rating: any;
  comments: any;
  reviewData: any;
  buyerId: any;
  otp: any;
  resultReview: any;
  noRecords: boolean = false;
  buttonDisabled: boolean = true;
  confirmDisabled: boolean = true;
  productName: any;
  trackByFn(index: any, item: any) {
    return index;
  }
  constructor(
    private menu: MenuController,
    private route: ActivatedRoute,
    private router: Router,
    private sellmyproductlistService: SellmyproductlistService,
    public loadingController: LoadingController,
    private reviewsService: ReviewsService,
    public actionSheetController: ActionSheetController,
    private alertCtrl: AlertController,
    public nav: NavController,
    public modalController: ModalController
  ) {
    this.presentLoading();
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.selectedProduct = this.router.getCurrentNavigation().extras.state.selectedProduct;
        this.getSellmyproductlist(this.selectedProduct);
      }
    });
    this.searchList = this.sellmyproductList;

    this.today = Date.now();
    this.today = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  changeProductAvailableDate(date) {
    this.today = date;
    this.today = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.buttonDisabled = false;

    console.log(date);
  }
  onOtp(eve: any) {
    this.otp = eve.target.value;
    if (this.otp != "") {
      this.confirmDisabled = false;
    }
    else {
      this.confirmDisabled = true;
    }
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

  async approve(item: any) {
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

    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'Order Approved',
      mode: 'ios',
      buttons: [
        {
          text: 'Okay',

          handler: () => {
            this.router.navigate(['/allproductslist']);
          }
        }
      ]
    });
    await alert.present().then(() => {
    });
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

  async reject(itemid: any, rejComments: any) {
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
    const alert = await this.alertCtrl.create({
      header: 'Rejection!',
      message: 'Order Rejected',
      mode: 'ios',
      buttons: [
        {
          text: 'Okay',

          handler: () => {
            this.router.navigate(['/allproductslist']);
          }
        }
      ]
    });
    await alert.present().then(() => {
    });
  }

  async sllerreviewAlert(item: any) {
    let modal = await this.modalController.create({
      component: ReviewModalPage,
      cssClass: 'my-custom-modal-css'
    });
    modal.onWillDismiss().then((data) => {

      this.reviewData = data;
      const mapped = Object.keys(this.reviewData).map(key => ({ type: key, value: this.reviewData[key] }));
      for (let u = 0; u < mapped.length; u++) {
        this.comments = mapped[0]["value"];
        this.rating = mapped[1]["value"];
      }
      if (data != "" || data != null) {
        this.sllerreRating(item, this.rating, this.comments)
      }
    });
    modal.present();

  }

  async ratingreview(item: any, rating: any) {

  }

  async sllerreRating(itemid: any, rating: any, comments: any) {

    var tags = ["5091a747-4feb-486b-bb64-d73acff50b58"];
    var userReview = {
      TagIds: tags,
      UserId: itemid.buyer.userId,
      Comments: comments,
      Rating: rating
    }
    var dataToApi = {
      InventoryItemId: itemid.id,
      OTP: eval(this.otp),
      UserReview: userReview
    };
    this.reviewsService.buyerReview(dataToApi).subscribe(
      (savedreturnData) => {
        this.reviewData = JSON.stringify(savedreturnData);
        console.log(this.reviewData);
      }
    )
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'Order Delivered',
      mode: 'ios',
      buttons: [
        {
          text: 'Okay',

          handler: () => {
            this.router.navigate(['/allproductslist']);
          }
        }
      ]
    });
    await alert.present().then(() => {
    });
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

  goBack() {
    this.nav.navigateForward("allproductslist");
  }

  openCartPage() {
    this.nav.navigateForward("cart");
  }

  openAccountPage() {
    this.nav.navigateForward("account");
  }

  getSellmyproductlist(id: any) {
    this.sellmyproductlistService.getSellmyproductlist(id)
      .subscribe(
        data => {

          this.sellmyproductList = data;
          this.sellmyproductList.forEach((key) => {
            key["today"] = '';
          })
          this.searchList = data;
          this.productName = this.searchList[0].productName;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }

}
