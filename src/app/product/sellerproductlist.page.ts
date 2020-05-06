import { Component, ViewChild, ElementRef } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, NavController, AlertController, ModalController } from '@ionic/angular';
import { ProductdetailService } from 'src/app/service/productdetail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { CartModalPage } from 'src/app/cart/cart-modal.page';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-sellerproductlist',
  templateUrl: './sellerproductlist.page.html',
  styleUrls: ['./sellerproductlist.page.scss'],
})
export class SellerproductlistPage {
  cart: any;
  products: any;
  //cartItemCount: BehaviorSubject<number>;
  cartItemCount: any;
  productList: any;
  categoryList: any;
  searchQuery: string;
  searchList: any;
  selectedProduct: any;
  quantity: any;
  sortbyPrice: any;
  today: any;
  hideMe: boolean;
  minPrice: any;
  maxPrice: any;
  basketData: any = "";
  price: any;
  userId: any;
  @ViewChild('cart', { static: false, read: ElementRef }) fab: ElementRef;

  constructor(private menu: MenuController,
    private route: ActivatedRoute,
    private router: Router,
    private productdetailService: ProductdetailService,
    private cartService: CartService,
    private productService: ProductService,
    public loadingController: LoadingController,
    private modalCtrl: ModalController,
    public actionSheetController: ActionSheetController,
    private alertCtrl: AlertController,
    public nav: NavController, ) {
    this.presentLoading();
    this.today = Date.now();
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.selectedProduct = this.router.getCurrentNavigation().extras.state.selectedProduct;
        this.getProductsdetail(this.selectedProduct);
     //   this.cart = this.cartService.getCart();
     //   this.cartItemCount = this.cartService.getCartItemCount();
      }
    });
    this.searchList = this.productList;
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  filterValue(minPrice, maxPrice) {
    const filterData = [];
    for (let i = 0; i < this.productList.length; i++) {
      let item = this.productList[i];
      if (item.price >= minPrice && item.price <= maxPrice) {
        filterData.push(item);
      }
    }
    return this.searchList = filterData;
  }

  sort() {
    switch (this.sortbyPrice) {
      case "Show Low to High Price":
        {
          this.productList = this.productList.sort((low, high) => low.price - high.price);
          break;
        }

      case "Show High to Low Price":
        {
          this.productList = this.productList.sort((low, high) => high.price - low.price);
          break;
        }
      case "Custom Price Range":
        {
          break;
        }
      case "Seller Name":
        {
          this.productList = this.productList.sort(function (low, high) {
            if (low.userId < high.userId) {
              return -1;
            }
            else if (low.userId > high.userId) {
              return 1;
            }
            else {
              return 0;
            }
          })
          break;
        }

      default: {
        this.productList = this.productList.sort((low, high) => low.price - high.price);
        break;
      }

    }
    return this.searchList = this.productList;
  }
  onSelectQuantity() {
    this.quantity = this.quantity;
    console.log(this.quantity);
}
  async addToCart(item: any) {
    //  this.cartService.addProduct(item);
    
    var pID : any = this.route.snapshot.paramMap.get(item.id);
    var basketToApi = {
      ProductId: item.id,
      Quantity: eval(this.quantity)

    };
    this.cartService.addProductToBasket(basketToApi).subscribe(
      (savedreturnbasketData) => {
        this.basketData = JSON.stringify(savedreturnbasketData);
        console.log(this.basketData);
      }
    )
    this.cartItemCount = this.cartService.getCartItemCount();
    this.animateCSS('tada');
  }

  async openCart() {
    this.animateCSS('bounceOutLeft', true);

    // let modal = await this.modalCtrl.create({
    //   component: CartModalPage,
    //   cssClass: 'cart-modal'
    // });
    this.nav.navigateForward("cartbasket");
    this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
    this.animateCSS('bounceInLeft');
    // modal.onWillDismiss().then(() => {
    //   this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
    //   this.animateCSS('bounceInLeft');
    // });
    // modal.present();
  }

  animateCSS(animationName, keepAnimated = false) {
    const node = this.fab.nativeElement;
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
      if (!keepAnimated) {
        node.classList.remove('animated', animationName);
      }
      node.removeEventListener('animationend', handleAnimationEnd)
    }
    node.addEventListener('animationend', handleAnimationEnd)
  }

  openFirst() {
    this.menu.enable(true, 'second');
    this.menu.open('second');
  }
  goBacktoHome() {
    this.nav.navigateBack("home");
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
    this.searchList = this.searchValue(this.productList, text);
  }

  openCartPage() {
    this.nav.navigateForward("cart");
  }

  getProductsdetail(id: any) {
    this.productdetailService.getProductdetail(this.selectedProduct)
      .subscribe(
        data => {
          this.productList = data;
          this.searchList = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  async filterAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Enter Price Range',
      inputs: [
        {
          name: 'min',
          type: 'number',
        },
        {
          name: 'max',
          type: 'number',
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
          handler: (mmValue) => this.filterValue(mmValue.min, mmValue.max)
        }
      ]
    });
    await alert.present();
  }
}
