import { Component } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { NotificationsService } from 'src/app/service/notifications.service';

@Component({
  selector: 'app-received',
  templateUrl: './received.page.html',
  styleUrls: ['./received.page.scss'],
})
export class ReceivedPage {
  receivedList: any;
  searchList: any;
  noRecords: boolean = true;
  loading: any;
  doRefresh: any;

  constructor(private menu: MenuController,
    private notificationsService: NotificationsService,
    public loadingController: LoadingController,
    public actionSheetController: ActionSheetController,
    public nav: NavController) {
    this.presentLoading();
    this.getmyreceivedlist();
    this.searchList = this.receivedList;
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
  ionViewWillEnter() {
    this.presentLoading();
    this.getmyreceivedlist();
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

  getmyreceivedlist() {
    this.notificationsService.getreceivedList().subscribe(
      data => {
        this.receivedList = data;
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
