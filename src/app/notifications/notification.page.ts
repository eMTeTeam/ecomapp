import { Component, OnInit } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, NavController } from '@ionic/angular';
import { NotificationsService } from 'src/app/service/notifications.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  receivedList: any;
  searchList: any;
  noRecords: boolean = true;
  loading: any;
  selectednotification: any;
  message:any;
  header:any;

  constructor(
    public loadingController: LoadingController,
    public actionSheetController: ActionSheetController,
    public nav: NavController,
    private notificationsService: NotificationsService,
    private route: ActivatedRoute,
    private router: Router

  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.selectednotification = this.router.getCurrentNavigation().extras.state.selectednotification;
        this.getmyreceivedlist();
        this.searchList = this.receivedList;
      }
    });
    this.getmyreceivedlist();
    this.searchList = this.receivedList;
  }

  ngOnInit() {

  }
  close() {
    this.nav.navigateForward("notification-list");
  }

  getmyreceivedlist() {
    this.notificationsService.getreceivedList().subscribe(
      data => {
        this.receivedList = data;
        for (let n = 0; n < this.receivedList.length; n++) {
          this.searchList = this.receivedList[0];
          this.message=this.receivedList[0].message;
          this.header= this.receivedList[0].fromUser.firstName;
        }
        this.loading.onDidDismiss();
        console.log(this.searchList);
      },
      error => {
        console.log(error);
      }
    );
  }
}
