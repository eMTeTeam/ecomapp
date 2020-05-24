import { Component, ViewChild, ElementRef } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, NavController, AlertController, ModalController } from '@ionic/angular';
import { ProductService } from 'src/app/service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';

@Component({
    selector: 'app-product',
    templateUrl: 'product.page.html',
    styleUrls: ['product.page.scss'],
})
export class ProductPage {
    products: any;
    productList: any;
    searchList: any;
    addressList: any;
    lat: any;
    longi: any;
    selectedCategory: any;
    distance1: any;
    splitdistance: any;
    fixedDistance1: any;
    fixedDistance2: any;
    noRecords: boolean = true;

    constructor(private menu: MenuController,
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService,
        public loadingController: LoadingController,
        private modalCtrl: ModalController,
        public actionSheetController: ActionSheetController,
        public alertController: AlertController,
        private accountService: AccountService,
        public nav: NavController, ) {
        this.presentLoading();
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.selectedCategory = this.router.getCurrentNavigation().extras.state.selectedCategory;
                this.getmyAddresslist(this.selectedCategory);
            }
        });
        this.searchList = this.productList;

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

    goToProductDetail(item) {
        console.log(item);
        let navigationExtras: NavigationExtras = { state: { selectedProduct: item.productName } };
        this.nav.navigateForward(['sellerproductlist'], navigationExtras);
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

    getProducts(id: any) {
        console.log(this.addressList);
        for (let a = 0; a < this.addressList.length; a++) {
            if (this.addressList[a]["isDefault"] == true) {
                this.lat = this.addressList[a]["lattitude"];
                this.longi = this.addressList[a]["longitude"];
            }
        }
        this.productService.getAllProductlist(this.selectedCategory, this.lat, this.longi)
            .subscribe(
                data => {
                    for (let u = 0; u < data.length; u++) {
                        this.distance1 = data[u]["distanceRange"];
                        this.splitdistance = this.distance1.split("-");
                        for (let s = 0; s < this.splitdistance.length; s++) {
                            this.fixedDistance1 = this.splitdistance[0];
                            this.fixedDistance2 = this.splitdistance[1];
                        }
                        data[u]["distanceRange"] = parseFloat(this.fixedDistance1).toFixed(2) + "-" + parseFloat(this.fixedDistance2).toFixed(2);
                    }
                    this.productList = data;
                    if (this.productList.length > 0) {
                        this.noRecords = !this.noRecords;
                    }
                    this.searchList = data;
                    console.log(data);
                },
                error => {
                    console.log(error);
                }
            );
    }

    getmyAddresslist(id: any) {
        this.accountService.getAddressList().subscribe(
            data => {
                this.addressList = data;
                console.log(data);
                if (data) {
                    this.getProducts(id);
                }
            },
            error => {
                console.log(error);
            }
        );

    }

}
