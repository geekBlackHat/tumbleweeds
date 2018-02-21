import { Injectable } from '@angular/core';
import { Http,Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { map, catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import * as socketIo from 'socket.io-client';

interface Socket {
  on(event: string, callback: (data: any) => void);
  emit(event: string, data: any);
}

declare var io: {
  connect(url: string): Socket;
};


@Injectable()
export class ApiCallsService {
  socket: Socket;
  observer: Observer<any>;

  baseurl: string = "http://127.0.0.1:8080";
  constructor(protected http: Http) {
    //this.headers = new Headers();
    //this.headers.append('Content-Type', 'application/json');
    //this.headers.append('Accept', 'application/json');
  }   

  getAllItems(url: string): Observable<any> {
   return this.http.get(url).map((response: any) => {
      console.log(response.json());
      return response.json();
    }).catch(this.handleError);
  }

  postData(data: any, url: string) {
  //  let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let finalUrl = this.baseurl + url;
    //let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    //let options = new RequestOptions({ headers: headers });
    return this.http.post(finalUrl, data)
      .map((response: Response) => {
        return response.json();
      }).catch((err : Response) => {
        let details = err.json();
        return Observable.throw(details);
      });

      //this.handleError
  }

  //This Method is used for error handling from API
  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.log("REST API Error : " + error);
    return Observable.throw('Internal server error');
  }

}