import { Component, OnInit } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { ReviewsService } from 'src/app/service/reviews.service';
import { IonSlides } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private menu: MenuController,
    private route: ActivatedRoute,
    private router: Router,
    private reviewsService: ReviewsService,
    public loadingController: LoadingController,
    public actionSheetController: ActionSheetController,
    private alertCtrl: AlertController,
    public nav: NavController
  ) {
    var curreDate = new Date();
    var curdate = curreDate.toLocaleDateString();
    this.currentDate = curdate;
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.selectedItem = this.router.getCurrentNavigation().extras.state.selectedProduct;
      }
    });
    this.presentLoading();
    this.searchList = this.selectedItem;
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

  async buyerComments() {
    {
      var tags = ["9d82e20b-96e1-11ea-9399-020361373239"];
      var dataToApi = {
        TagIds: tags,
        UserId: "Karthik",
        Comments: this.comments,
        Rating: eval(this.rate)
      };
      this.reviewsService.sellerReview(dataToApi).subscribe(
        (savedreturnData) => {
          this.reviewData = JSON.stringify(savedreturnData);
          console.log(this.reviewData);
        }
      )
    }
  }

}
