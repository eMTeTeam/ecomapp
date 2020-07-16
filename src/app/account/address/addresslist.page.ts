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
  loading: any;
  isDefault: any;
  ishiddennorecords = true;
  ishidden = true;

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
  ionViewWillEnter() {
    this.presentLoading();
    this.getmyAddresslist();
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
        if (this.addressList.length == 0) {
          this.ishiddennorecords = false;
          this.ishidden=true;
        }
        else {
          this.ishidden=false;
          this.ishiddennorecords = true;
          if (this.addressList.length > 0) {
            this.noRecords = !this.noRecords;
            for (let u = 0; u < this.addressList.length; u++) {
              this.isDefault = this.addressList[u]["isDefault"];
              if (this.isDefault == true) {
                this.addressList[u]["isDefault"] = "Default";
  
              }
            }
          }
        }
      
        this.searchList = data;
        this.loading.onDidDismiss();
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

}
