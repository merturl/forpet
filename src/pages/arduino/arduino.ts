import { Arduino } from './../../models/arduino';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

/**
 * Generated class for the ArduinoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-arduino',
  templateUrl: 'arduino.html',
})
export class ArduinoPage {
  arduino = {} as Arduino;
  arduinoRef: AngularFireObject<any>;
  uid: string;
  isExists: boolean;
  authSubscription: any;
  dbSubscription: any;
  messageList = [];

  constructor(private afDatabase: AngularFireDatabase, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArduinoPage');
    this.authSubscription=this.afAuth.authState.subscribe(auth => {
      this.uid = auth.uid;
      this.dbSubscription = this.afDatabase.object(`arduino/${auth.uid}`).snapshotChanges().subscribe(action => {
        console.log(action.key)
        if(action.payload.val()){
          this.isExists = true;
          this.arduino = action.payload.val();
        }else{
          console.log(action.payload.val())
          this.isExists = false;
        }
      });
    });
  }
  ionViewDidLeave() {
    console.log('ionViewDidLeave ArduinoPage');
    this.dbSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }
  
  registArduino(){
    this.arduino.motor = false;
    this.arduino.sound = false;
    this.arduino.weight = 0;
    this.afDatabase.object(`arduino/${this.uid}`).set(this.arduino).then(()=>this.navCtrl.pop());
  }
}
