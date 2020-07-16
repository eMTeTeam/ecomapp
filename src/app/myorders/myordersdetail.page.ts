import { Component, OnInit } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, ModalController, AlertController, NavController } from '@ionic/angular';
import { ReviewsService } from 'src/app/service/reviews.service';
import { IonSlides } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewModalPage } from 'src/app/sellmyproduct/review-modal/review-modal.page'
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-myordersdetail',
  templateUrl: './myordersdetail.page.html',
  styleUrls: ['./myordersdetail.page.scss'],
})
export class MyordersdetailPage {
  sellmyproductList: any;
  searchList: any;
  currentDate: any;
  rate: any;
  comments: any;
  reviewData: any;
  selectedItem: any;
  rating: any;
  noRecords: boolean = false;
  ishiddennorecords = true;
  ishidden = true;
  unitName: any;
  tagID:any;
  constructor(
    private menu: MenuController,
    private route: ActivatedRoute,
    private router: Router,
    private reviewsService: ReviewsService,
    public loadingController: LoadingController,
    public actionSheetController: ActionSheetController,
    private alertCtrl: AlertController,
    public nav: NavController,
    public modalController: ModalController
  ) {
    var curreDate = new Date();
    var curdate = curreDate.toLocaleDateString();
    this.currentDate = curdate;
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.selectedItem = this.router.getCurrentNavigation().extras.state.selectedProduct;
        this.unitName = this.selectedItem.unitName;
        if (this.unitName == "Gram") {
          this.selectedItem.unitName = "Kg";
        }
        else if (this.unitName == "MilliLitre") {
          this.selectedItem.unitName = "Litre";
        }
        console.log(this.selectedItem);
      }
    });
    this.presentLoading();
    this.searchList = this.selectedItem;
    console.log(this.selectedItem);

  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  goBack() {
    this.nav.navigateBack("myorders");
  }

  onRateChange(event) {
    this.rate = event;
    console.log('Your rate:', event);
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
  async buyerreviewAlert(item: any) {
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
      this.rating = this.rating.split(",");
      for (let s = 0; s < this.rating.length; s++) {
          this.tagID = this.rating[0];
          this.rating = this.rating[1];
      }
      if (data) {
        this.buyerComments(item, this.rating, this.comments,this.tagID)
      }
    });

    modal.present();

  }
  async buyerComments(item: any, rating: any, comments: any, tagID: any) {
    {
      var tags = [tagID];
      var dataToApi = {
        TagIds: tags,
        UserId: item.seller.userId,
        Comments: comments,
        Rating: eval(rating)
      };
      this.reviewsService.sellerReview(dataToApi).subscribe(
        async (savedreturnData) => {
          this.reviewData = JSON.stringify(savedreturnData);
          console.log(this.reviewData);
          const alert = await this.alertCtrl.create({
            header: 'Confirm!',
            message: 'Reviewed Successfully',
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
      )
    }
  }

}
