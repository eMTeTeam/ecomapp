import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
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
import { ReactiveFormsModule } from '@angular/forms';
import { IonicSelectableModule } from 'ionic-selectable';
import { IonicRatingModule } from 'ionic4-rating';
import { InterceptorService } from '../../src/app/service/interceptor.service';
import { ReviewModalPageModule } from '../../src/app/sellmyproduct/review-modal/review-modal.module';
//import { GoogleLoginProvider, SocialLoginModule, AuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angularx-social-login';  
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';  

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("437128387301-ctap3juk31ldh9t6bidu792t2gqu2n95.apps.googleusercontent.com")
  },
  // {
  //   id: FacebookLoginProvider.PROVIDER_ID,
  //   provider: new FacebookLoginProvider('YOUR-APP-ID')
  // }
]);
export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, ReactiveFormsModule,FormsModule, IonicModule.forRoot(), SocialLoginModule,ReviewModalPageModule, AppRoutingModule, IonicRatingModule, HttpClientModule, NgxPrettyCheckboxModule, IonicSelectableModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [
    StatusBar,
    SplashScreen,
   // { provide: HTTP_INTERCEPTORS, useClass:InterceptorService, RouteReuseStrategy, useClass: IonicRouteStrategy, multi:true }
    // {
    //   provide: RouteReuseStrategy,
    //   useClass: IonicRouteStrategy, multi: true
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService, multi: true
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }