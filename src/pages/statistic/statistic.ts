// import { Weight } from './../../models/weight';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as HighCharts from 'highcharts';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the StatisticPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-statistic',
  templateUrl: 'statistic.html',
})
export class StatisticPage {
  dbSubscription: any;
  dbObservable: Observable<Date>;
  result: number = 0;
  isExists : boolean;
  message: string;
  

  constructor(private afDatabase: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    if(this.navParams.data.address !== undefined || this.navParams.data.address !== null){
      this.isExists = true;
      console.log(this.navParams.data.address);
      this.dbSubscription = this.afDatabase.object(`averageweight/${this.navParams.data.address}`).snapshotChanges().subscribe( async data=>{
        if(data.key !== null){
          console.log("sas"+data.key );
          console.log("sas"+data.payload.val());
          var result = Object.keys(data.payload.val()).map(function(key) {
            return [Number(key), data.payload.val()[key]];
          });
          this.getWeekChart(result.reverse());
        }else{
          this.message = "데이터가 없습니다!"
          this.isExists =false;
        }
      });
    }else{
      this.message = "등록된 기기가 없습니다.";
      this.isExists = false;
    }
  }

  ionViewDidLeave(){
    console.log('ionViewDidLeave TabsPage');
    if(this.dbSubscription !== undefined){
      this.dbSubscription.unsubscribe();
    }
  }
  
  getWeekChart(weekdate){
    HighCharts.chart('weekConsumption', {
      chart: {
        type: 'column',
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
      },
      credits: {
        enabled: false
      },
      title: {
        text: '주간 섭취량'
      },
      xAxis: {
        categories: (function () {
          // generate an array of random data
          var data = [], i;
              
          for (i = weekdate.length-1; i >= 0; i -= 1) {
              data.push(weekdate[i][0]);
          }
          return data;
      }())  // here input date
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Total fruit consumption',
          enabled: false
        },
        stackLabels: {
          enabled: true,
            style: {
              fontWeight: 'bold',
              color: (HighCharts.theme && HighCharts.theme.textColor) || 'gray'
            }
          }
        },
      // },
      // legend: {
      //     align: 'right',
      //     x: -70,
      //     verticalAlign: 'top',
      //     y: 20,
      //     floating: true,
      //     backgroundColor: (HighCharts.theme && HighCharts.theme.legendBackgroundColorSolid) || 'white',
      //     borderColor: '#CCC',
      //     borderWidth: 1,
      //     shadow: t
      // },
      // tooltip: {
      //     formatter: function() {
      //         return '<b>'+ this.x +'</b><br/>'+
      //             this.series.name +': '+ this.y +'<br/>'+
      //             'Total: '+ this.point.stackTotal;
      //     }
      // },
      plotOptions: {
        column: {
              // stacking: 'normal',
              dataLabels: {
                enabled: true,
                color: (HighCharts.theme && HighCharts.theme.dataLabelsColor) || 'white',
                style: {
                  textShadow: '0 0 3px black, 0 0 3px black'
                }
              }
            }
          },
          series: [{
            showInLegend: false,
            name: 'PetName',
            data: (function () {
              // generate an array of random data
              var data = [], i;
              for (i = weekdate.length-1; i >= 0; i -= 1) {
                data.push(parseFloat((weekdate[i][1].weight).toFixed(2)));
                  // data.push((weekdate[i][1].weight));
              }
              console.log(data);
              return data;
          }())
          }]
        });
      }
}
