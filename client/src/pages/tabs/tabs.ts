import { StatisticPage } from './../statistic/statistic';
import { FoodPage } from './../food/food';
import { ArduinoPage } from './../arduino/arduino';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1page = ArduinoPage;
  tab2page = FoodPage;
  tab3page = StatisticPage;
  tab4page = ProfilePage;
  tabParams: any;
  authSubscription: any;
  dbSubscription: any;
  uid: string;
  

  constructor(private afDatabase: AngularFireDatabase,private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    this.authSubscription = this.afAuth.authState.subscribe(auth => {
      if(auth){
        this.tabParams = auth;
        this.uid = auth.uid;
        this.dbSubscription = this.afDatabase.object(`arduino/${this.uid}`).snapshotChanges().subscribe(action=>{
          console.log(action.payload.exists);
          if(action.payload.exists()){
            this.tabParams.address = action.payload.val().address;
          }
        });
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }
  
  ionViewDidLeave(){
    console.log('ionViewDidLeave TabsPage');
    this.dbSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }
}
