import { Component } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, NavController, ModalController, AlertController } from '@ionic/angular';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sellmyproduct',
    templateUrl: 'sellmyproduct.page.html',
    styleUrls: ['sellmyproduct.page.scss'],
})
export class SellmyproductPage {
    sellmyproductList: any;
    productList: any;
    categoryList: any;
    currentDate: any;
    expiryDate: any;
    searchList: any;
    products: any;
    selectedCategory: any;
    selectedProduct: any;
    savedData: any = "";
    price: any;
    quantity: any;
    unitName: string;
    maxdistance: any;
    expectdelivery: any;
    loading: any;

    constructor(private menu: MenuController,
        public loadingController: LoadingController,
        private categoryService: CategoryService,
        public httpClient: HttpClient,
        private productService: ProductService,
        public actionSheetController: ActionSheetController,
        private modalCtrl: ModalController,
        private alertCtrl: AlertController,
        private router: Router,
        public nav: NavController) {
        this.presentLoading();
                this.searchList = this.productList;
    }

    searchText(event: any) {
        this.productService.getAllProduct(event.text)
            .subscribe(
                data => {
                    debugger;
                    this.productList = data;
                    this.searchList = data;
                    console.log(data);
                },
                error => {
                    console.log(error);
                }
            );
    }
   
    onSelectProduct() {
        console.log(this.selectedProduct);
    }

    async addProduct() {
        this.presentLoading();
        var dataToApi = {
            ProductNameId: this.selectedProduct.productNameId,
            CategoryId: this.selectedProduct.categoryId,
            Description: this.selectedProduct.name,
            UnitId: "ad89ae0a-44c6-4c3a-b116-2a8f1f1144f0",
            Quantity: eval(this.quantity),
            Price: eval(this.price),
            ImageUrl: "image",
            AvailableOn: this.currentDate,
            ExpiredOn: this.expiryDate
        };
        this.productService.saveData(dataToApi).subscribe(
            (savedreturnData) => {
                this.savedData = JSON.stringify(savedreturnData);
               
                console.log(this.savedData);
            }
        )
        const alert = await this.alertCtrl.create({
            message: 'Product Added Successfully',
            buttons: [
                {
                    text: 'OK',

                    handler: () => {
                        this.router.navigate(['/allproductslist']);
                    }
                }
            ]
        });
        await alert.present().then(() => {
            
             this.loading.onDidDismiss();
        });
    }

    goback() {
        this.nav.navigateBack("allproductslist");
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
                    console.log('Share clicked');
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

    changeProductAvailableDate(date) {
        console.log(date);
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
   
}
