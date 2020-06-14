import { Component } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, NavController, AlertController } from '@ionic/angular';

@Component({
    selector: 'app-account',
    templateUrl: 'account.page.html',
    styleUrls: ['account.page.scss'],
})
export class AccountPage {

    constructor(private menu: MenuController,
        public loadingController: LoadingController,
        public actionSheetController: ActionSheetController,
        public nav: NavController, public alertController: AlertController) {
        this.presentLoading();
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
        this.nav.navigateForward("allproductslist");
    }

    addAddress() {
        this.nav.navigateForward("addresslist");
    }

    myOrders() {
        this.nav.navigateForward("myorders");
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
    myProfile() {
        this.nav.navigateForward("userprofile");
    }
}

