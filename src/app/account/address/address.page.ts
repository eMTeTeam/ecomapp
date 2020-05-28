import { Component } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, NavController, ModalController, AlertController } from '@ionic/angular';
import { AccountService } from 'src/app/service/account.service';
import { HttpClient } from '@angular/common/http';
import { OsmLayerComponent } from 'src/app/account/address/osm-layer/osm-layer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage {

  addressline1: any;
  addressline2: any;
  city: any;
  state: any;
  country: any;
  zipcode: any;
  lattitude: any;
  longitude: any = "";
  savedAddress: any = "";
  addressType: any;
  defaultAddress: boolean;
  loading:any;

  constructor(private menu: MenuController,
    public loadingController: LoadingController,
    private accountService: AccountService,
    public httpClient: HttpClient,
    public actionSheetController: ActionSheetController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    public nav: NavController) {
    this.presentLoading();
  }

  checkEvent(list: any) {
  //  this.addressId=list.addressId;
  this.defaultAddress=list.target.checked;
  }
  async addAddress() {
    this.presentLoading();
    var dataToApi = {
      AddressLine1: this.addressline1,
      AddressLine2: this.addressline2,
      City: this.city,
      State: this.state,
      Country: this.country,
      Zip: eval(this.zipcode),
      Lattitude: eval(this.lattitude),
      Longitude: eval(this.longitude),
      "isDefault": this.defaultAddress,
      AddressType:this.addressType
    };
    this.accountService.saveAddress(dataToApi).subscribe(
      (savedreturnData) => {
        this.savedAddress = JSON.stringify(savedreturnData);
        console.log(this.savedAddress);
      }
    )

    const alert = await this.alertCtrl.create({
      message: 'My Address: ' + this.addressType +' has been saved successfully.',
      buttons: [
        {
          text: 'OK',

          handler: () => {
            this.router.navigate(['/addresslist']);
          }
        }
      ]
    });
    await alert.present().then(() => {
      this.loading.onDidDismiss();
    });
  }

  goBack() {
    this.nav.navigateForward("addresslist");
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: OsmLayerComponent
    });
    await modal.present();
    let onclosed = await modal.onDidDismiss();
    this.lattitude = onclosed.data.lat;
    this.longitude = onclosed.data.lng;
    console.log(this.lattitude);
  }

  goback() {
    this.nav.navigateBack("account");
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
