import { Component, ViewChild, ElementRef } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, NavController, AlertController, ModalController } from '@ionic/angular';
import { ProductService } from 'src/app/service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { CartModalPage } from 'src/app/cart/cart-modal.page';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-product',
    templateUrl: 'product.page.html',
    styleUrls: ['product.page.scss'],
})
export class ProductPage {
    cart: any;
    products: any;
    cartItemCount: BehaviorSubject<number>;
    productList: any;
    categoryList: any;
    searchQuery: string;
    searchList: any;
    selectedCategory: any;
    today: any;
    @ViewChild('cart', { static: false, read: ElementRef }) fab: ElementRef;
    constructor(private menu: MenuController,
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService,
        private cartService: CartService,
        public loadingController: LoadingController,
        private modalCtrl: ModalController,
        public actionSheetController: ActionSheetController,
        public alertController: AlertController,
        public nav: NavController, ) {
        this.presentLoading();
        this.today = Date.now();
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.selectedCategory = this.router.getCurrentNavigation().extras.state.selectedCategory;
                this.getProducts(this.selectedCategory);
                this.cart = this.cartService.getCart();
                this.cartItemCount = this.cartService.getCartItemCount();
            }
        });
        this.searchList = this.productList;
    }

    async addToCart(item: any) {
        this.cartService.addProduct(item);
        this.animateCSS('tada');
    }

    async openCart() {
        this.animateCSS('bounceOutLeft', true);

        let modal = await this.modalCtrl.create({
            component: CartModalPage,
            cssClass: 'cart-modal'
        });
        modal.onWillDismiss().then(() => {
            this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
            this.animateCSS('bounceInLeft');
        });
        modal.present();
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
        this.productService.getAllProduct(this.selectedCategory)
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
}
