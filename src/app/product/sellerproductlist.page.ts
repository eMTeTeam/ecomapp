import { Component, ViewChild, ElementRef } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, ToastController, NavController, NavParams, AlertController, ModalController } from '@ionic/angular';
import { ProductdetailService } from 'src/app/service/productdetail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-sellerproductlist',
  templateUrl: './sellerproductlist.page.html',
  styleUrls: ['./sellerproductlist.page.scss'],
})
export class SellerproductlistPage {
  cart: any;
  products: any;
  cartItemCount: any;
  productList: any;
  searchList: any;
  selectedProduct: any;
  sortbyPrice: any;
  minPrice: any;
  maxPrice: any;
  basketData: any = "";
  price: number;
  //amount: number;
  firstName: any;
  loading: any;
  // count: number = 0;
  // amount: number;
  itemId: any;
  quantity: number = 0;
  addressList: any;
  lat: any;
  longi: any;
  total: any;
  distance1: any;
  splitdistance: any;
  fixedDistance1: any;
  fixedDistance2: any;
  basePrice: number;
  qty: number = 0;
  addToCartDisabled: boolean = true;
  openCartDisabled: boolean = true;
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
    private accountService: AccountService,
    public nav: NavController,
    public toastController: ToastController) {
    this.presentLoading();
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.selectedProduct = this.router.getCurrentNavigation().extras.state.selectedProduct;
        this.getmyAddresslist(this.selectedProduct);
        this.bindCartItemcount();
        //  this.cartItemCount = this.cartService.getCartItemCount();

      }
    });
    this.searchList = this.productList;

    //  this.cartItemCount = this.cartService.getCartItemCount();


  }
  //   ngOnInit() {
  //     // Let's navigate from TabsPage to Page1
  //     this.onViewWillEnter();
  //  }

  ionViewWillEnter() {
    this.cartService.getCartItemCount();
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

  trackByFn(index: any, item: any) {
    return index;
  }

  async changeQty(item, i, change) {
    this.qty = item.quantity;
    if (change < 0 && item.qty == 1) {
      return;
    }
    if (change == 1) {
      this.qty = item.quantity++
    }
    if (change == -1) {
      this.qty = item.quantity--
    }
    this.qty = item.quantity;
    item.quantity = this.qty;
    item.price = this.qty * item.basePrice;
    if (item.quantity > 0) {
      this.addToCartDisabled = false;
    }
    else {
      this.addToCartDisabled = true;
    }
  }

  onChangeQty(eve: any, item) {
    item.quantity = eve.target.value;
    this.qty = item.quantity;
    item.price = item.quantity * item.basePrice;
    if (item.quantity > 0) {
      this.addToCartDisabled = false;
    }
    else {
      this.addToCartDisabled = true;
    }
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
            if (low.firstName < high.firstName) {
              return -1;
            }
            else if (low.firstName > high.firstName) {
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
    // this.cartItemCount =this.cartItemCount + 1;
    this.presentLoading();
    var basketToApi = {
      ProductId: item.id,
      Quantity: eval(item.quantity)
    };
    this.cartService.addProductToBasket(basketToApi).subscribe(
      (savedreturnbasketData) => {
        this.basketData = JSON.stringify(savedreturnbasketData);
        this.bindCartItemcount();
        console.log(this.basketData);
        this.openCartDisabled = false;
      }
    )

    //this.presentLoading();
    // this.cartItemCount = this.cartService.getCartItemCount();
    this.animateCSS('tada');
    //return this.cartItemCount;

  }
  async bindCartItemcount() {
    this.cartService.getCartItemCount().subscribe(
      data => {
        this.cartItemCount = data;
        if (this.cartItemCount > 0) {
          this.openCartDisabled = false;
        }
        else {
          this.openCartDisabled = true;
        }
        this.loading.onDidDismiss();
      });
   
  }
  async openCart() {
    this.animateCSS('bounceOutLeft', true);
    this.nav.navigateForward("cartbasket");
    this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
    this.animateCSS('bounceInLeft');
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

  goBack() {
    this.nav.navigateBack("product");
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
    for (let a = 0; a < this.addressList.length; a++) {
      if (this.addressList[a]["isDefault"] == true) {
        this.lat = this.addressList[a]["lattitude"];
        this.longi = this.addressList[a]["longitude"];
      }
    }
    this.productdetailService.getProductdetail(this.selectedProduct, this.lat, this.longi)
      .subscribe(
        data => {

          data.forEach((key) => {
            key["quantity"] = 0;
            key["basePrice"] = key["price"];
          })
          for (let u = 0; u < data.length; u++) {
            this.distance1 = data[u]["distance"];
            this.splitdistance = this.distance1.toString().split(".");
            for (let s = 0; s < this.splitdistance.length; s++) {
              this.fixedDistance1 = this.splitdistance[0];
            }
            data[u]["distance"] = parseFloat(this.fixedDistance1);
          }
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

  getmyAddresslist(id: any) {
    this.accountService.getAddressList().subscribe(
      data => {
        this.addressList = data;
        console.log(data);
        if (data) {
          this.getProductsdetail(id);
        }
      },
      error => {
        console.log(error);
      }
    );

  }
}
