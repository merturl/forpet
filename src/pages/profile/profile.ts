import { Profile } from './../../models/profile';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, LoadingController, ToastController } from 'ionic-angular';
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
  dbSubscription: any;
  loading: any;

  constructor(private toast: ToastController, public loadingCtrl: LoadingController, public app: App, private afDatabase: AngularFireDatabase,private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
      this.dbSubscription = this.afDatabase.object(`profile/${this.navParams.data.uid}`).snapshotChanges().subscribe(action => {
        console.log(action.key)
        if(action.payload.val()){
          this.isExists = true;
          this.profile = action.payload.val();
        }else{
          console.log(action.payload.val())
          this.isExists = false;
        }
      });
  }

  createProfile(){
    try {
      if(this.navParams.data.uid && this.profile.firstname && this.profile.lastname && this.profile.username){
        this.afDatabase.object(`profile/${this.navParams.data.uid}`).set(this.profile).then(res=>{
          this.loading.dismiss().then(res=>{
            this.toast.create( { message: `프로필이 저장 되었습니다.`,
            duration: 1000 } ).present();
          });
        }); //list().puh -> set key but object().set -> have not key
        this.loading = this.loadingCtrl.create();
        this.loading.present();
      }else{
        throw '1';
      }
      
    }catch(e){
      if(e.message === undefined){
        console.log("hee")
        this.toast.create( { message: `잘못된 입력입니다.`,
        duration: 1000 } ).present();
      }else{
        this.toast.create( { message: `${e.message}`,
        duration: 1000 } ).present();
      }
      
    }
  }

  ionViewDidLeave(){
    console.log('ionViewDidLeave TabsPage');
  }

  signOut(){
    this.dbSubscription.unsubscribe();
    this.afAuth.auth.signOut().then(()=>this.app.getRootNav().setRoot(LoginPage));
  }

}
