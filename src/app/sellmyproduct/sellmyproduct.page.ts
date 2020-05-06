import { Component } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, NavController, ModalController, AlertController } from '@ionic/angular';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IonicSelectableComponent } from 'ionic-selectable';

@Component({
    selector: 'app-sellmyproduct',
    templateUrl: 'sellmyproduct.page.html',
    styleUrls: ['sellmyproduct.page.scss'],
})
export class SellmyproductPage {
    productList: any;
    categoryList: any;
    currentDate: any;
    searchList: any;
    products: any;
    selectedCategory: any;
    selectedProduct: any;
    today: any;
    savedData: any = "";
    price: string;
    quantity:any;
    unitName: string;

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
        var curreDate = new Date();
        var curdate = curreDate.toLocaleDateString();
        this.currentDate = curdate;
        this.categoryList = this.getCategories();
        this.searchList = this.productList;
    }

    getProducts(id: any) {
        this.productService.getAllProduct(this.categoryList.id)
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

    onSelectCategory() {
        console.log(this.selectedCategory);
        this.productService.getAllProduct(this.selectedCategory.id)

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

    onSelectProduct() {
        this.unitName = this.selectedProduct.unitName;
        console.log(this.selectedProduct);
    }

    async addProduct() {
        var dataToApi = {
            ProductNameId: this.selectedProduct.productNameId,
            CategoryId: this.selectedCategory.id,
            Description: this.selectedProduct.productName,
            UnitId: "ad89ae0a-44c6-4c3a-b116-2a8f1f1144f0",
            Quantity: eval(this.quantity),
            Price: eval(this.price),
            ImageUrl: "image"

        };
        this.productService.saveData(dataToApi).subscribe(
            (savedreturnData) => {
                this.savedData = JSON.stringify(savedreturnData);
                console.log(this.savedData);
            }
        )
        let alert = await this.alertCtrl.create({
            header: 'Success',
            message: 'Product Added Successfully',
            buttons: ['OK']

        });
        // alert.present().then(() => {
        //     this.modalCtrl.dismiss();
        //     this.router.navigate(['/home']);
        // });
    }

    goback() {
        this.nav.navigateBack("account");
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

    getCategories() {
        this.categoryService.getAllCategories()
            .subscribe(
                data => {
                    this.categoryList = data;
                    this.searchList = data;
                    console.log(data);
                },
                error => {
                    console.log(error);
                }
            );
    }
}
