import { Component, OnInit } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, NavController } from '@ionic/angular';
import { NotificationsService } from 'src/app/service/notifications.service';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.page.html',
  styleUrls: ['./notification-list.page.scss'],
})
export class NotificationListPage {
  receivedList: any;
  searchList: any;
  noRecords: boolean = true;
  loading: any;
  selectednotification:any;

  constructor(
    private notificationsService: NotificationsService,
    public loadingController: LoadingController,
    public actionSheetController: ActionSheetController,
    public nav: NavController
  ) { 
    this.presentLoading();
    this.getmyreceivedlist();
    this.searchList = this.receivedList;
  }
 
  openNotification(item)
  {
    //this.nav.navigateForward("notification");
  
        let navigationExtras: NavigationExtras = { state: { selectednotification: item.id } };
        this.nav.navigateForward(['notification'], navigationExtras);
  }
  goback()
  {
    this.nav.navigateForward("home");
  }
  openFirst() {
    // this.menu.enable(true, 'first');
    // this.menu.open('first');
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
