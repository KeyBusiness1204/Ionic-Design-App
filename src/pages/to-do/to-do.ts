import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HomePage } from '../home/home';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage()
@Component({
  selector: 'page-to-do',
  templateUrl: 'to-do.html',
})

export class ToDoPage {

  public status: string = '';
  public status1: string = '';
  public cucumber: any;
  public item: any;
  public divClass: string = 'not_submiitted';
  public divClass1: string = 'not_submiitted';
  public msg: string;
  public msg1: string;
  public btn: string;
  public btn1: string;
  // public date1: boolean;
  // public date2: boolean;
  // public date3: boolean;
  public dates: any = [];
  public updateDates: any = [];
  public dateDatas: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private iab: InAppBrowser,
    public service :  ServiceProvider,
    public alertCtrl: AlertController)
  {
    this.msg = "The client has requested to reschedule this meeting. We've found a few times that look good, pick two...";
    this.msg1 = "The client has requested to reschedule this meeting. We've found a few times that look good, pick two...";
    this.btn = "SUBMIT UPDATE";
    this.btn1 = "SUBMIT UPDATE";

    this.dates = [
      { name: 'Wed, February 23, 2018 1:00 PM', isChecked: false },
      { name: 'Fri, February 25, 2018 10:00 AM', isChecked: false },
      { name: 'Mon, February 28, 2018 11:00 AM', isChecked: false }
    ];
    this.dateDatas = [
      { name: 'Wed, February 23, 2018 1:00 PM', isChecked: false },
      { name: 'Fri, March 2, 2018 10:00 AM', isChecked: false },
      { name: 'Fri, March 2, 2018 10:00 AM', isChecked: false }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ToDoPage');
  }

  firstCheck(){

  }

  checkDate(date ,event){
    var d = new Date(date);
    var n = d.toISOString();
    if(event.checked == true){
      this.updateDates.push(n);
    }
    if(event.checked == false){
      this.updateDates.pop();
    }
  }

  checkDate1(date ,event){
    console.log(event.checked);

    if(event.checked == true){
      var d = new Date(date);
      var n = d.toISOString();
      console.log(n);
    }
  }

  sendUpdate(){
    console.log(this.updateDates);
    this.service.updateAppointment(this.updateDates[0], this.updateDates[1], this.updateDates[2]).then(res =>{
      if(res['state'] == 'success')
        this.showMsgAlert( res['message']);
    });

    this.status = 'unsubmitted';
    this.divClass = 'submiitted';
    this.msg = "These preferred time slots have been sent to your client to choose from. We will send you a notification when they reply.";
    this.btn = "PENDING CONFIRMATION...";
  }


  showMsgAlert(text) {
    let alert = this.alertCtrl.create({
      title: text,
      subTitle: 'message confirmation ID.',
      buttons: [{
        text: "OK",
      }]
    });
    alert.present();
  }

  update2(){
    this.status1 = 'unsubmitted';
    this.divClass1 = 'submiitted';
    this.msg1 = "These preferred time slots have been sent to your client to choose from. We will send you a notification when they reply.";
    this.btn1 = "PENDING CONFIRMATION...";
  }

  back(){
    this.navCtrl.pop();
  }

  openHelp() {
    const browser = this.iab.create('https://engagemyclient.com/helpdesk');
    browser.show();
  }

  contact(){
    const browser = this.iab.create('https://engagemyclient.com/contact');
    browser.show();
  }

  mapPage(){
    this.navCtrl.push(MapPage);
  }

  mainCalendar(){
    this.navCtrl.setRoot(HomePage, {
      event : false,
      calendar : true
    });
  }
}
