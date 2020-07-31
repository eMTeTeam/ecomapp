import { Component } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { ProductdetailService } from 'src/app/service/productdetail.service';

@Component({
    selector: 'app-productdetail',
    templateUrl: 'productdetail.page.html',
    styleUrls: ['productdetail.page.scss'],
})
export class ProductDetailPage {
    productDetail: any;
    selectedProduct: any;
    currentNumber = 1;

    public increment() {
        this.currentNumber++;
    }

    public decrement() {
        this.currentNumber--;
        if (this.currentNumber < 1) {
            this.currentNumber = 1
        }
    }

    constructor(private menu: MenuController,
        private route: ActivatedRoute,
        private router: Router,
        private ProductdetailService: ProductdetailService,
        public loadingController: LoadingController,
        public actionSheetController: ActionSheetController,
        public nav: NavController, public alertController: AlertController) {
        this.presentLoading();
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {

                this.selectedProduct = this.router.getCurrentNavigation().extras.state.selectedProduct;
                this.productDetail = this.getProductdetail(this.selectedProduct);
            }
        });
        this.productDetail = this.getProductdetail(this.selectedProduct);
    }

    goback() {
        this.nav.navigateBack("product");
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

    openCartPage() {
        this.nav.navigateForward("cart");
    }

    async addToCart() {
        const alert = await this.alertController.create({
            message: '<b>Tomotto</b> Successfully added into cart',
            mode: 'ios',
            buttons: [
                {
                    text: 'Okay',
                    handler: () => {

                    }
                }
            ]
        });
        await alert.present();
    }

    getProductdetail(id: any) {

    }
}
