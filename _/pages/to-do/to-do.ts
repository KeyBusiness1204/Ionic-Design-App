import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map';
import { InAppBrowser } from '@ionic-native/in-app-browser';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser,)
  {
    this.msg = "The client has requested to reschedule this meeting. We've found a few times that look good, pick two...";
    this.msg1 = "The client has requested to reschedule this meeting. We've found a few times that look good, pick two...";

    this.btn = "SUBMIT UPDATE";
    this.btn1 = "SUBMIT UPDATE";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ToDoPage');
  }
  firstCheck(){

  }
  update(){
    this.status = 'unsubmitted';
    this.divClass = 'submiitted';
    this.msg = "These preferred time slots have been sent to your client to choose from. We will send you a notification when they reply.";
    this.btn = "PENDING CONFIRMATION...";
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

}
