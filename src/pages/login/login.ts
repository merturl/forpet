import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from './../register/register';
import { AngularFireAuth } from "angularfire2/auth";
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  loading: any;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    
  }

  async login(user: User){
    try {
      this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(authData => {
        this.loading.dismiss();
      });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }catch (e){
      console.error(e);
    }
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

}
