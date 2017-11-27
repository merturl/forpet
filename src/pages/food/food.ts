import { Observable } from 'rxjs/Observable';
import { Arduino } from './../../models/arduino';
import { MessageServiceProvider } from './../../providers/message-service/message-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as HighCharts from 'highcharts';
import { AngularFireDatabase } from 'angularfire2/database';
/**
 * Generated class for the FoodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-food',
  templateUrl: 'food.html',
})
export class FoodPage {

  left: string;
  arduino: Arduino;
  isExists: boolean;
  authSubscription: any;
  dbObservable: Observable<any>;
  dbSubscription: any;
  message: string;

  constructor( public loadingCtrl: LoadingController, private afDatabase: AngularFireDatabase, private messageService: MessageServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    // this.dbObservable = this.afDatabase.object(`motor/${this.navParams.data.address}`).snapshotChanges();
    console.log(this.navParams.data.address);
  }

  ionViewDidLoad() {
    
    // this.dbSubscription = this.dbObservable.subscribe((data)=>{this.getChart(data[data.length-1])});
    if(this.navParams.data.address !== undefined){
      this.isExists = true;
      try{
      this.dbObservable = this.afDatabase.list(`nowweight/${this.navParams.data.address}`).valueChanges();
      this.dbSubscription = this.dbObservable.subscribe((data)=>{
        if(data.length > 0 ){
          console.log('hello');
          this.getChart(data[data.length-1]);
        }else{
          this.message = "데이터가 없습니다!"
          this.isExists =false;
        }
      });
      }catch(e){
        console.log(e.message);
      }
    }else{
      this.message = "등록된 기기가 없습니다.";
      this.isExists = false;
    }
  }

  async getChart(eat) {
    if(eat.weight < 0){
      eat.weight = 0;
    }
    await HighCharts.chart('todayConsumption', { 
      chart: {
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
      },
      credits: {
        enabled: false
      },
      title: {
          text: '현재 사료량'
      },
      tooltip: {
          enabled: false,
          pointFormat: '{series.name}: <b>{point.percentage:.0f}%</b>'
      },
      plotOptions: {
        pie: {
          size: '100%',
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
            format: '<b>{point.name}</b>: {point.percentage:.0f} %',
            style: {
              color: (HighCharts.theme && HighCharts.theme.contrastTextColor) || 'black'
            }
          },
          showInLegend: true
        }
      },
      series: [{
        name: '사료',
        colorByPoint: false,
        data: [{
          name: '먹은량 : '+(65*100/65-(parseFloat(eat.weight)/65)*100).toFixed(2).toString()+"%",
          y: 65*100/65-(parseFloat(eat.weight)/65)*100,
          color: 'white'
        }, {
          name: '남은량: '+(parseFloat(eat.weight)/65*100).toFixed(2).toString()+"%",
          y: (parseFloat(eat.weight)/65*100),
          color: '#bf6341'
        }]
      }]
    });
  }

  ionViewDidLeave() {
    if(this.dbSubscription !== undefined){
      this.dbSubscription.unsubscribe();
    }
  }

  refillFood(){
    var loading;
    console.log("asasd");
    this.afDatabase.object(`motor/${this.navParams.data.address}/isRotation`).set(1).then(res=>{
      console.log(res);
      loading.dismiss();
    });
    loading = this.loadingCtrl.create();
    loading.present();
    this.afDatabase.object(`motor/${this.navParams.data.address}/isRotation`).set(1);
  }
  getMessage(address: string): any{
    this.messageService.getMessages(address).subscribe(data =>{
      for(var key in data){
        // this.messageList.push(data[key]);
        console.log(<boolean>data[key].motor);
        return <boolean>data[key].motor;
      }
    },error=>console.log(error));
  }
}
