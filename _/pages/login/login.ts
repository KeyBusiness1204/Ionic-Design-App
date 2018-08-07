import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ForgotPage } from '../forgot/forgot';
import { HomePage } from '../home/home';
import { ListPage } from '../list/list';
import { AddPage } from '../add/add';
import { ToDoPage } from '../to-do/to-do';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: any;
  password: any;
  required: boolean = false;
  e_required: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private iab: InAppBrowser,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    // this.navCtrl.push(ListPage);
    // this.navCtrl.push(ListPage);
    // this.navCtrl.push(ListPage);
  }

  Login(){
      this.required = true;
      if(this.email)
        this.e_required = true;
      console.log(this.email, ':', this.password);
      if(this.email != null && this.password != null )
        this.navCtrl.setRoot(HomePage);
  }

  forgotPassword(){
    console.log(this.email, ':', this.password);
    this.navCtrl.push( ForgotPage, {
      email: this.email
    });
  }

  openHelp() {
    const browser = this.iab.create('https://engagemyclient.com/helpdesk');
    browser.show();
  }

  openFacebook() {
    const browser = this.iab.create('https://facebook.com/engagemyclient');
    browser.show();
  }

}
