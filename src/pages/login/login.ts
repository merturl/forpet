import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from './../register/register';
import { AngularFireAuth } from "angularfire2/auth";
import { LoadingController } from 'ionic-angular';
import { GooglePlus } from "@ionic-native/google-plus";
import firebase from 'firebase';
import { Platform } from 'ionic-angular';
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

  constructor(public platform:Platform, public googleplus:GooglePlus, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
   
  }

  async login(user: User){
    try {
      this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(authData => {
        this.loading.dismiss();
      }, error=>{console.log(error);this.loading.dismiss();});
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }catch (e){
      console.error(e);
    }
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }
  loginWithGoogle(){
    if (this.platform.is('core') ||this.platform.is('mobile') || this.platform.is('mobileweb')) {
      console.log("asasd");
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(res=>{
        console.log(res);
        this.loading.dismiss();
      });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    } else {
      this.googleplus.login({
        'webClientId':'399926770516-umj6hgmrq4jrj3eiavjacdtl9tg0hvae.apps.googleusercontent.com',
        'offline':true
      }).then(res=>{
        firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken)).then(suc=>{
          alert("LOGIN SUC");
        }).catch(error=>{
          alert("Not SUC");
        })
      })
    }
  }

  logoutOfGoogle(){
    this.afAuth.auth.signOut();
  }

}
