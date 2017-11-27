import { FoodPage } from './../pages/food/food';
import { StatisticPage } from './../pages/statistic/statistic';
import { TabsPage } from './../pages/tabs/tabs';
import { ArduinoPage } from './../pages/arduino/arduino';
import { ProfilePage } from './../pages/profile/profile';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { HttpClientModule } from '@angular/common/http';
import { GooglePlus } from "@ionic-native/google-plus";

// import { FirebaseObjectObservable  } from "angularfire2/database-deprecated"; 쓰이지 않음


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from './../pages/login/login';
import { RegisterPage } from './../pages/register/register';
import { MessageServiceProvider } from '../providers/message-service/message-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    ArduinoPage,
    TabsPage,
    StatisticPage,
    FoodPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      // tabsPlacement: 'top'
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
    }),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    ArduinoPage,
    TabsPage,
    StatisticPage,
    FoodPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MessageServiceProvider,
    GooglePlus
  ]
})
export class AppModule {}
