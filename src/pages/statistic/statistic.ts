import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as HighCharts from 'highcharts';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    var myChart = HighCharts.chart('weeksConsumption', {
      chart: {
        type: 'bar'
      },
      title: {
        text: '사료 섭취량' // Consumption
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: ['월', '화', '수', '목', '금', '토', '일']
      },
      yAxis: {
        title: {
          text: '단위 g'
      }
      },
      series: [{
        name: 'Jane',
        colorByPoint: false,
        data: [10, 20, 40, 50, 60, 80, 90],
        color: 'black',
      }
      // , {
      //   name: 'John',
      //   data: [1, 0, 4, 5, 6, 8, 9]
      // }
    ]
    });
  }

}
