import { ArduinoPage } from './../arduino/arduino';
import { ProfilePage } from './../profile/profile';
import { Profile } from './../../models/profile';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  profileData: Observable<Profile>;
  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, private toast: ToastController, private afDatabase: AngularFireDatabase) {

  }

  ionViewWillLoad(){
    console.log(this.afAuth.auth.signInWithCredential);
    this.afAuth.authState.take(1).subscribe(data =>{
      if(data && data.email && data.uid){
        this.toast.create({
          message: `Welcome to forPet, ${data.email}`,
          duration: 3000 //3sec
        }).present();
          this.profileData = this.afDatabase.object('profile').valueChanges();
          this.profileData.subscribe(x=>{
            if(typeof x[data.uid] === 'undefined'){
              console.log(x[data.uid]);
              this.navCtrl.push(ProfilePage);
            }else{
              console.log(x[data.uid]);
              console.log(Object.keys[data.uid]);
            }
          }, error=>{console.log("asd")});
      }else{
        this.toast.create({
          message: `Could not find authentication details`,
          duration: 3000 //3sec
        }).present();
      }
    });
  }

  addArduino(){
    this.navCtrl.push(ArduinoPage);
  }
}
