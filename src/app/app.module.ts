import { NgModule, CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPrettyCheckboxModule } from 'ngx-pretty-checkbox';
import { IonicSelectableModule } from 'ionic-selectable';
import { IonicRatingModule } from 'ionic4-rating';
import { InterceptorService } from '../../src/app/service/interceptor.service';
// import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angularx-social-login';  
// import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';  

// export function socialConfigs() {  
//   const config = new AuthServiceConfig(  
//     [  
//       // {  
//       //   id: FacebookLoginProvider.PROVIDER_ID,  
//       //   provider: new FacebookLoginProvider('app -id')  
//       // },  
//       {  
//         id: GoogleLoginProvider.PROVIDER_ID,  
//         provider: new GoogleLoginProvider('437128387301-ctap3juk31ldh9t6bidu792t2gqu2n95.apps.googleusercontent.com')  
//       }  
//     ]  
//   );  
//   return config;  
// }  

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, FormsModule, IonicModule.forRoot(), AppRoutingModule,IonicRatingModule,HttpClientModule,NgxPrettyCheckboxModule,IonicSelectableModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
  providers: [
    StatusBar,
    SplashScreen,
    // { provide: HTTP_INTERCEPTORS, useClass:InterceptorService, RouteReuseStrategy, useClass: IonicRouteStrategy, multi:true }
    { provide: HTTP_INTERCEPTORS, useClass:InterceptorService, multi:true },
    // AuthService,  
    // {  
    //   provide: AuthServiceConfig,  
    //   useFactory: socialConfigs  
    // } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}