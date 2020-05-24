import { Component, OnInit } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-addresslist',
  templateUrl: './addresslist.page.html',
  styleUrls: ['./addresslist.page.scss'],
})
export class AddresslistPage {

  addressList: any;
  searchList: any;
  noRecords: boolean = true;

  constructor(private menu: MenuController,
    private accountService: AccountService,
    public loadingController: LoadingController,
    public actionSheetController: ActionSheetController,
    public nav: NavController) {
    this.presentLoading();
    this.getmyAddresslist();
    this.searchList = this.addressList;
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

  addNewAddress() {
    this.nav.navigateForward("address");
  }

  goBack() {
    this.nav.navigateForward("account");
  }

  editAddress() {

  }

  getmyAddresslist() {
    this.accountService.getAddressList().subscribe(
      data => {
        this.addressList = data;
        if (this.addressList.length > 0) {
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

}
