import { Arduino } from './../../models/arduino';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
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
  isExists: boolean;
  dbSubscription: any;
  messageList = [];

  constructor(private toast: ToastController, public loadingCtrl: LoadingController, private afDatabase: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.dbSubscription = this.afDatabase.object(`arduino/${this.navParams.data.uid}`).snapshotChanges().subscribe(action => {
      if(action.payload.exists()){
        this.isExists = true;
        this.arduino = action.payload.val();
      }else{
        this.isExists = false;
      }
    });
  }

  ionViewDidLoad() {
    
  }
  ionViewDidLeave() {
    console.log('ionViewDidLeave ArduinoPage');
    this.dbSubscription.unsubscribe();
  }
  
  registArduino(){
    // var loading;
    if(this.arduino.address !== undefined && this.arduino.address.length > 0){
      this.afDatabase.object(`arduino/${this.navParams.data.uid}`).set(this.arduino).then(res=>{
        this.toast.create( { message: `아두이노가 저장 되었습니다.`, duration: 1000 } ).present();
      });
      console.log(this.arduino.address+"tihs11");
    }else{
      this.toast.create( { message: `등록 실패.`, duration: 1000 } ).present();
    }
    
    // try{
    //   if(this.arduino.address.length > 0){
    //     .then(res=>{
    //       loading.dismiss().then(res=>{
    //         this.toast.create( { message: `아두이노가 저장 되었습니다.`,
    //         duration: 1000 } ).present();
    //       });
    //     }); //list().puh -> set key but object().set -> have not key
    //     loading = this.loadingCtrl.create();
    //     loading.present();
    //   }else{
    //     throw '1';
    //   }
    // }catch(e){
    //   this.toast.create( { message: `등록 실패.`,
    //   duration: 1000 } ).present();
    // }
    // this.arduino.motor = false;
    // this.arduino.sound = false;
    // this.arduino.weight = 0;
  }
}
