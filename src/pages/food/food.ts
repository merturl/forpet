import { Observable } from 'rxjs/Observable';
import { Arduino } from './../../models/arduino';
import { MessageServiceProvider } from './../../providers/message-service/message-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as HighCharts from 'highcharts';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
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
  eat: number;
  arduino: Arduino;
  isExists: boolean;
  authSubscription: any;
  dbObservable: Observable<any>;
  dbSubscription: any;

  constructor(private afDatabase: AngularFireDatabase, private afAuth: AngularFireAuth, private messageService: MessageServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.authSubscription= this.afAuth.authState.subscribe(auth => {
      // this.dbSubscription = this.afDatabase.object(`arduino/${auth.uid}`).snapshotChanges().subscribe(action => {
      //   console.log(action.key)
      //   if(action.payload.val()){
      //     this.isExists = true;
      //     this.arduino = action.payload.val();
      //     console.log();
      //   }else{
      //     console.log(action.payload.val())
      //     this.isExists = false;
      //   }
      // });
      this.dbObservable = this.afDatabase.object(`arduino/${auth.uid}`).valueChanges();
    });
  }

  ionViewDidLoad() {
    this.left ="남은양";
    this.dbSubscription = this.dbObservable.subscribe(data=>{this.eat = data.weight; this.getChart();});
  }

  getChart() {
    var myChart = HighCharts.chart('todayConsumption', {
      chart: {
          plotBackgroundColor: null,
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
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: (HighCharts.theme && HighCharts.theme.contrastTextColor) || 'black'
            }
          }
        }
      },
      series: [{
        name: '사료',
        colorByPoint: false,
        data: [{
          name: '남은량',
          y: 100.0
        }, {
          name: '먹은량',
          y: this.eat,
          color: 'black'
        }]
      }]
    });
  }

  ionViewDidLeave() {
    this.dbSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
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
