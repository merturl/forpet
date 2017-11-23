import { Weight } from './../../models/weight';
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
  dbObservable: Observable<Date>
  datelist = [];
  result: number = 0;

  constructor(private afDatabase: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    const date = new Date();
    console.log()
    // ${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
    this.dbSubscription = this.afDatabase.object(`weight/${this.navParams.data.address}`).snapshotChanges().subscribe(data=>{
      // console.log(data);
      console.log(data.payload.exportVal());
      for(var key in data.payload.val()){
        this.datelist= data.payload.val();
        console.log(this.datelist);    
      }
      // this.result = 0;
      // data.forEach(async (day)=>{
      //   let dayLength=0;
      //   for(var key in day){
      //     this.result+= await day[key].weight;
      //     dayLength++;
      //   }
      //   console.log(dayLength);
      //   this.datelist.push(this.result/dayLength);
      //   console.log(this.result);
      // });
      // console.log(this.datelist);
      // this.getWeekChart(this.datelist);
    });
  }

  ionViewDidLoad() {
  }
  ionViewDidLeave(){
    console.log('ionViewDidLeave TabsPage');
    this.dbSubscription.unsubscribe();
  }
  getWeekChart(weekdate){
    HighCharts.chart('weekConsumption', {
      chart: {
        type: 'column'
      },
      credits: {
        enabled: false
      },
      title: {
        text: '주간 섭취량'
      },
      xAxis: {
        categories: ["월","화","수"]  // here input date
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
            data: [1,2,3]
          }]
        });
      }
}
