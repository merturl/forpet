import { Profile } from './../../models/profile';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AngularFireDatabase } from "angularfire2/database";
import { LoginPage } from '../login/login';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile = {} as Profile;
  isExists : boolean;
  authSubscription: any;
  dbSubscription: any;
  constructor(public app: App, private afDatabase: AngularFireDatabase,private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    this.authSubscription = this.afAuth.authState.subscribe(auth => {
      this.dbSubscription = this.afDatabase.object(`profile/${auth.uid}`).snapshotChanges().subscribe(action => {
        console.log(action.key)
        if(action.payload.val()){
          this.isExists = true;
          this.profile = action.payload.val();
        }else{
          console.log(action.payload.val())
          this.isExists = false;
        }
      });
    });
  }

  createProfile(){
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`profile/${auth.uid}`).set(this.profile) //list().puh -> set key but object().set -> have not key
      .then(()=>this.navCtrl.pop());
    })
  }


  signOut(){
    this.dbSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
    this.afAuth.auth.signOut().then(()=>this.app.getRootNav().setRoot(LoginPage));
  }

}
