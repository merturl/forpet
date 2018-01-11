import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

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
  private url : string = 'http://116.33.27.63:217/';

  constructor(private http: HttpClient) {
    
  }

  getMessages(address: string){
    return this.http.get(this.url+"motor/"+address);
  }
  postMessage(){
    var datajson= {weight: 1};
    // alert(JSON.stringify(datajson));
    var apiurl = this.url + 'weight';
    this.http.post(apiurl, datajson).subscribe(
      data => {console.log(data);}
      ,(err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.name);
        console.log(err.message);
        console.log(err.status);
      });
    }

  putMessage(){
    var datajson= {id: 1, message: "i'm ionic"};
    // alert(JSON.stringify(datajson));
    var apiurl = this.url + '/home';
    this.http.put(apiurl, datajson,).subscribe(data => {console.log(data)});
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
