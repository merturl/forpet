import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;

  constructor(private toast: ToastController, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth) {

  }

  async register(user: User){
    var loading;
    try{
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(res=>{
        console.log(res);
        loading.dismiss();
      });
      loading = this.loadingCtrl.create();
      loading.present();
      if(result){
        this.navCtrl.pop();
      }
    }catch(e){
      this.toast.create( { message: `${e.message}`,
      duration: 1000 } ).present();
    }
  }
}
