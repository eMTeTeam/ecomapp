import { Component } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, NavController, AlertController } from '@ionic/angular';

@Component({
    selector: 'app-account',
    templateUrl: 'account.page.html',
    styleUrls: ['account.page.scss'],
})
export class AccountPage {
    productList: any;
    categoryList: any;
    private currentNumber = 1;

    private increment() {
        this.currentNumber++;
    }

    private decrement() {
        this.currentNumber--;
        if (this.currentNumber < 1) {
            this.currentNumber = 1
        }
    }
    constructor(private menu: MenuController,
        public loadingController: LoadingController,
        public actionSheetController: ActionSheetController,
        public nav: NavController, public alertController: AlertController) {
        this.presentLoading();
        this.productList = [
            { name: "Tomoto", price: 300, imageurl: "../../assets/Vegetables.jpg" },
            { name: "Potato", price: 500, imageurl: "../../assets/Fruits.jpg" },
            { name: "Chicken", price: 600, imageurl: "../../assets/Flowers.jpg" },
            { name: "Cosmetics", price: 300, imageurl: "../../assets/Cosmetics.jpg" },
            { name: "Cloths", price: 100, imageurl: "../../assets/Cloths.jpg" },
            { name: "Kitchen Sets", price: 100, imageurl: "../../assets/Kitchen.jpg" },
            { name: "Foods", price: 100, imageurl: "../../assets/Foods.jpg" },
            { name: "Meats", price: 100, imageurl: "../../assets/Meats.jpg" },
        ];
        this.categoryList = [
            { name: "Vegetables", price: 300, imageurl: "../../assets/Vegetables.jpg" },
            { name: "Fruits", price: 500, imageurl: "../../assets/Fruits.jpg" },
            { name: "Flowers", price: 600, imageurl: "../../assets/Flowers.jpg" },
            { name: "Cosmetics", price: 300, imageurl: "../../assets/Cosmetics.jpg" },
            { name: "Cloths", price: 100, imageurl: "../../assets/Cloths.jpg" },
            { name: "Kitchen Sets", price: 100, imageurl: "../../assets/Kitchen.jpg" },
            { name: "Foods", price: 100, imageurl: "../../assets/Foods.jpg" },
            { name: "Meats", price: 100, imageurl: "../../assets/Meats.jpg" },
        ];
    }

    goback() {
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
    signOut() {
        this.nav.navigateForward("login");
    }
    async presentAlertConfirm() {
        const alert = await this.alertController.create({
            header: 'Confirm!',
            message: 'Are you sure want to sign out?',
            mode: 'ios',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Okay',
                    handler: () => {
                        this.signOut();
                    }
                }
            ]
        });

        await alert.present();
    }

    sellMyProductList() {
        this.nav.navigateForward("sellmyproductlist");
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
