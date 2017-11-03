import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';

/*
  Generated class for the MessageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessageServiceProvider {

  // private url : string = 'https://www.gurglingnuns.com';
  // private url : string = 'http://restcountries.eu/rest/v2/all';
  private url : string = '/home';

  constructor(private http: HttpClient) {
    
  }

  getMessages(){
    return this.http.get(this.url);
  }
  // postMessages(){
  //   return new Promise((resolve, reject) => {
  //     this.http.post(this.url, JSON.stringify('data'))
  //       .subscribe(res => {
  //         resolve(res);
  //       }, (err) => {
  //         reject(err);
  //       });
  //   });
  // }
}
