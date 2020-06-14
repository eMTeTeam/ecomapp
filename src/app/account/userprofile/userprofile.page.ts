import { Component } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.page.html',
  styleUrls: ['./userprofile.page.scss'],
})
export class UserprofilePage {

  searchList: any;
  noRecords: boolean = true;
  loading: any;
  firstName: any;
  isFarmer: any;
  lastName: any;
  emailId: any;
  mobileNumber: any;

  constructor(private menu: MenuController,
    private accountService: AccountService,
    public loadingController: LoadingController,
    public actionSheetController: ActionSheetController,
    public nav: NavController) {
    this.presentLoading();

    this.searchList = this.getmyprofile();
  }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
  ionViewWillEnter() {
    this.presentLoading();
    this.getmyprofile();
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

  goBack() {
    this.nav.navigateForward("home");
  }

  getmyprofile() {
    this.accountService.getProfile().subscribe(
      data => {
        this.searchList = data;
        this.firstName = this.searchList.firstName;
        this.lastName = this.searchList.lastName;
        this.isFarmer = this.searchList.isFarmer;
        this.emailId = this.searchList.emailId;
        this.mobileNumber = this.searchList.mobileNumber;
        //  this.loading.onDidDismiss();
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

}
