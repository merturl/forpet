import { Profile } from './../../models/profile';
import { AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  profileData: Observable<Profile[]>;
  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, private toast: ToastController, private afDatabase: AngularFireDatabase) {

  }

  ionViewWillLoad(){
    this.afAuth.authState.take(1).subscribe(data =>{
      if(data && data.email && data.uid){
        this.toast.create({
          message: `Welcome to forPet, ${data.email}`,
          duration: 3000 //3sec
        }).present();

        this.profileData = this.afDatabase.object(`profile/${data.uid}`).valueChanges();
      }else{
        this.toast.create({
          message: `Could not find authentication details`,
          duration: 3000 //3sec
        }).present();
      }
    });
  }

}
