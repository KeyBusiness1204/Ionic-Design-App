
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
@Injectable()
export class ServiceProvider {

  public added_event : boolean;
  public g_airline : string;
  public g_flight_num : number;
  constructor(public http: Http) {
    console.log('Hello ServiceProvider Provider');
  }

}
