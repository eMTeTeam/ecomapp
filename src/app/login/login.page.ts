import { Component, OnInit } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { ToastController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import {CommonapiService} from '../../app/service/commonapi.service';
//import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angularx-social-login';  
// import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
// import { Socialusers } from '../../app/service/socialuser' 

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {

 // socialusers=new Socialusers();
  public response: any;
  public error: any;
  returnUrl: string;
  constructor(private googlePlus: GooglePlus,
    private commonapiservice: CommonapiService,
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController,
    private navCtrl: NavController
   // public OAuth: AuthService 
   // private SocialloginService: SocialloginService 
    ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log('URL:', this.returnUrl);
  }

  // socialSignIn = (socialProvider: string)  => {
  //   let socialPlatformProvider;  
  //   if (socialProvider === 'facebook') {  
  //     socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;  
  //   } else if (socialProvider === 'google') {  
  //     socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;  
  //   }  
  //   this.OAuth.signIn(socialPlatformProvider).then(res => {  
  //     console.log(socialProvider, res);  
  //     console.log(res);
  //   this.response=res;
  //    // this.Savesresponse(socialusers);
  //   });
  // }

  // socialSignIn() {
  //   let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
  //   this.isLoading = true;

  //   this.OAuth.signIn(socialPlatformProvider)
  //     .then((userData) => {
  //       //on success
  //       //this will return user data from google. What you need is a user token which you will send it to the server
  //       this.authenticationService.googleSignInExternal(userData.idToken)
  //         .pipe(finalize(() => this.isLoading = false)).subscribe(result => {

  //           console.log('externallogin: ' + JSON.stringify(result));
  //           if (!(result instanceof SimpleError) && this.credentialsService.isAuthenticated()) {
  //             this.router.navigate(['/index']);
  //           }
  //       });
  //     });
  // }

 

  googleLogin = () => {
    const options: any = {};
    this.googlePlus.login(options)
      .then(res => {
        console.log(res);
        this.response = res;
        this.commonapiservice.setToken(this.response.idToken);
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