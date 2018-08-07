
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams, AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
@Injectable()
export class ServiceProvider {

  public added_event : boolean;
  connects : any = [];
  public loading: any;

  contentHeader = new Headers({"Content-Type": "application/x-www-form-urlencoded"});
  LOGIN_URL: string = "https://engagemyclient.net/mobile/auth";
  GET_AIRLINES: string = "https://engagemyclient.net/mobile/flight/airlines";
  GET_Flights: string = "https://engagemyclient.net/mobile/flight/get/";
  SAVE_Flights: string = "https://engagemyclient.net/mobile/flight/put/eventID";
  POST_MESSAGE: string = "https://engagemyclient.net/mobile/send/eventID";
  GET_Message: string = "https://engagemyclient.net/mobile/history/eventID";
  UPDATE_APPOINTMENT: string = "https://engagemyclient.net/mobile/update/eventID/";
  token: string ;
  constructor(
    public http: Http,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  )
  {
    console.log('Hello ServiceProvider Provider');
  }

  showAlert(text) {
    let alert = this.alertCtrl.create({
      title: text,
      subTitle: 'Plase try again.',
      buttons: [{
        text: "OK",
      }]
    });
    alert.present();
  }

  loadingDisplay(){
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }
  loadingDismiss(){
    this.loading.dismiss();
  }

  login(login){
    return new Promise(resolve => {
      var param = "email="+login.email+"&pw="+login.password;

      this.http.post(this.LOGIN_URL, JSON.stringify(login), {
        headers: this.contentHeader,
        body:  param
      }).map(res => res.json()).subscribe(
        data => {
          resolve(data);
        },
        err=>{
          resolve('error');
        }
      );
    });
  }

  getAirlines(){
    return new Promise(resolve => {
      this.http.post(this.GET_AIRLINES, {
        headers: this.contentHeader,
      }).map(res => res.json()).subscribe(
        data => {
          console.log(data);
          resolve(data);
        },
        err=>{
          resolve('error');
        }
      );
    });
  }

  getFlights(code, flight, date){
    var params = code+"/"+flight+"/"+date;
    // var params = "AA/100/2018-01-22";
    console.log(params);
    return new Promise(resolve => {
      this.http.post(this.GET_Flights + params, {
        headers: this.contentHeader,
      }).map(res => res.json()).subscribe(
        data => {
          resolve(data);
        },
        err=>{
          resolve('error');
        }
      );
    });
  }

  saveFlights( token, departureDate, numFlights, flight1code, flight1num, flight2code, flight2num,
    flight3code, flight3num, flight4code, flight4num, flight5code, flight5num){

    var param = "token="+this.token+"&departureDate="+departureDate+"&numFlights="+numFlights+"&flight1code="+flight1code+"&flight1num="+flight1num+"&flight2code="+flight2code
    +"&flight2num="+flight2num+"&flight3code="+flight3code+"&flight3num="+flight3num+"&flight4code="+flight4code+"&flight4num="+flight4num+"&flight5code="+flight5code+"&flight5num="+flight5num;

    var paramData = {
      token: this.token,
      departureDate: departureDate,
      numFlights: numFlights,
      flight1code: flight1code, flight1num: flight1num,
      flight2code: flight2code, flight2num: flight2num,
      flight3code: flight3code, flight3num: flight3num,
      flight4code: flight4code, flight4num: flight4num,
      flight5code: flight5code, flight5num: flight5num
    }
    return new Promise(resolve => {
      this.http.post(this.SAVE_Flights, JSON.stringify(paramData), {
        headers: this.contentHeader,
        body: param
      }).map(res => res.json()).subscribe(
        data => {
          console.log(data);
          resolve(data);
        },
        err=>{
          resolve('error');
        }
      );
    });
  }

  postMessage(comment){
    var param = "token="+this.token+"&message="+comment;
    var messageData = {
      token: this.token,
      message: comment
    }
    return new Promise(resolve => {
      this.http.post(this.POST_MESSAGE,  JSON.stringify(messageData),{
        headers: this.contentHeader,
        body : param
      }).map(res => res.json()).subscribe(
        data => {
          resolve(data);
        },
        err=>{
          resolve('error');
        });
    });
  }

  getMessage(){
    return new Promise(resolve => {
      this.http.post(this.GET_Message , {
        headers: this.contentHeader,
      }).map(res => res.json()).subscribe(
        data => {
          resolve(data);
        },
        err=>{
          resolve('error');
        }
      );
    });
  }

  updateAppointment(update_date1, update_date2, update_date3 ){
    var params = update_date1+"/"+update_date2+"/"+update_date3;
    console.log(params);
    var paramData = {
      token: this.token
    }
    return new Promise(resolve => {
      this.http.post(this.UPDATE_APPOINTMENT + params,  JSON.stringify(paramData),{
        headers: this.contentHeader,
      }).map(res => res.json()).subscribe(
        data => {
          resolve(data);
        },
        err=>{
          resolve('error');
        }
      );
    });
  }

}
