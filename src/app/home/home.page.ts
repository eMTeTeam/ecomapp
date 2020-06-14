import { Component } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, NavController } from '@ionic/angular';
import { CategoryService } from 'src/app/service/category.service';
import { IonSlides } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    categoryList: any;
    searchList: any;
    userDisplayName = '';
    constructor(private menu: MenuController,
        private categoryService: CategoryService,
        public loadingController: LoadingController,
        public actionSheetController: ActionSheetController,
        public nav: NavController) {
        this.presentLoading();
        this.getCategories();
        this.searchList = this.categoryList;
        this.userDisplayName = sessionStorage.getItem('loggedUser');
    }

    openFirst() {
        this.menu.enable(true, 'first');
        this.menu.open('first');
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

    openProduct(item) {
        console.log(item);
        let navigationExtras: NavigationExtras = { state: { selectedCategory: item.id } };
        this.nav.navigateForward(['product'], navigationExtras);
    }

    slideOpts = {
        initialSlide: 0,
        speed: 400,
        autoplay: true
    };

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
        this.searchList = this.searchValue(this.categoryList, text);
    }

    slidesDidLoad(slides: IonSlides) {
        slides.startAutoplay();
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

    openNotification() {
        this.nav.navigateForward("received");
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
