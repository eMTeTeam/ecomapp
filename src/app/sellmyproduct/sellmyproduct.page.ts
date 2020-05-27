import { Component } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, NavController, ModalController, AlertController } from '@ionic/angular';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormControl, FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: 'app-sellmyproduct',
    templateUrl: 'sellmyproduct.page.html',
    styleUrls: ['sellmyproduct.page.scss'],
})
export class SellmyproductPage {
    sellmyproductList: any;
    productList: any;
    editProductList: any;
    editPrice: any;
    editProduct: any;
    editAvailableon: any;
    editExpiryOn: any;
    editQuantity: any;
    editMaxdistancecover: any;
    editExpectdeliveryIn: any;
    categoryList: any;
    currentDate: any;
    editExpiryDate: any;
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
    ishidden = false;
    ishiddenedit = true;
    sellmyproduct: FormGroup;
    // productData = { "selectedProduct": "", 
    // "filefield": "", 
    // "currentDate": "", 
    // "expiryDate": "",
    // "quantity": "", 
    // "price": ""};
    constructor(private menu: MenuController,
        public loadingController: LoadingController,
        private formBuilder: FormBuilder,
        private categoryService: CategoryService,
        public httpClient: HttpClient,
        private productService: ProductService,
        public actionSheetController: ActionSheetController,
        private modalCtrl: ModalController,
        private alertCtrl: AlertController,
        private route: ActivatedRoute,
        private router: Router,
        public nav: NavController) {
        this.presentLoading();

        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.selectedProduct = this.router.getCurrentNavigation().extras.state.selectedProduct;
                if (this.selectedProduct == "" || this.selectedProduct == undefined) {
                    this.ishiddenedit = true;

                }
                else {
                    this.ishiddenedit = false;
                    this.ishidden = true;
                }

                this.editProductList = this.getEditproductlist(this.selectedProduct);
                this.currentDate = new Date().toISOString();
                this.editExpiryDate = new Date().toISOString();
                //  this.editPrice=this.editProductList.price;
            }
        });
        this.searchList = this.productList;
        // this.sellmyproduct = new FormGroup({
        //     selectedProduct: new FormControl('', [Validators.required]),
        //     filefield: new FormControl('', [Validators.required]),
        //     currentDate: new FormControl('', [Validators.required]),
        //     expiryDate: new FormControl('', [Validators.required]),
        //     quantity: new FormControl('', [Validators.required]),
        //     price: new FormControl('', [Validators.required]),
        // });
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

    uploadFile(event) {
        let file = event.target.files[0];
        console.log(file);
        const formData = new FormData();
        formData.append('FormFile', file);
        formData.get('FormFile');
        this.productService.saveImage(formData).subscribe(
            (savedreturnData) => {
                this.savedData = JSON.stringify(savedreturnData);
                console.log(this.savedData);
            }
        )

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

    async updateProduct() {
        this.presentLoading();
        var dataToApi = {
            Id: this.selectedProduct,
            Price: eval(this.editPrice),
            ImageUrl: "Image",
            Quantity: eval(this.editQuantity)

        };
        this.productService.updateProduct(dataToApi).subscribe(
            (savedreturnData) => {
                this.savedData = JSON.stringify(savedreturnData);

                console.log("Updated Product", this.savedData);
            }
        )
        const alert = await this.alertCtrl.create({
            message: 'Product Updated Successfully',
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
        this.editAvailableon = date;
        console.log(date);
    }
    changeProductExpiryDate(date) {
        this.editExpiryDate = date;
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
    getEditproductlist(id: any) {
        this.productService.getEditProduct(id)
            .subscribe(
                data => {

                    this.editProductList = data;
                    this.editPrice = this.editProductList.price;
                    this.editProduct = this.editProductList.name;
                    this.editQuantity = this.editProductList.quantity;
                    //   this.editAvailableon=this.currentDate;
                },
                error => {
                    console.log(error);
                }
            );
    }
}
