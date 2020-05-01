import { Component, OnInit } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { ToastController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {

  public response: any;
  public error: any;
  returnUrl: string;
  constructor(private googlePlus: GooglePlus,
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController,
    private navCtrl: NavController) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log('URL:', this.returnUrl);
  }

  googleLogin = () => {
    const options: any = {};
    this.googlePlus.login(options)
      .then(res => {
        console.log(res);
        this.response = res;
        this.showWelcomeToast()
          .then(response => this.navCtrl.navigateRoot(['home']));
      })
      .catch(err => {
        console.error(err);
        this.error = err;
        this.showErrorToast(this.error);
      });
  }

  async showWelcomeToast() {
    const toast = await this.toastController.create({
      message: 'Welcome, ' + this.response.displayName + '!',
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }

  async showErrorToast(error: any) {
    const toast = await this.toastController.create({
      message: 'Error: ' + error,
      duration: 2000,
      position: 'top',
    });

    toast.present();
  }
}