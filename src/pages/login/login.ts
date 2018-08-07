import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, AlertController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ServiceProvider } from '../../providers/service/service';

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

  required: boolean = false;
  e_required: boolean = false;
  registerCredentials : any;
  public loading: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private iab: InAppBrowser,
    public service: ServiceProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
  )
  {
    this.registerCredentials = { email: '', password: '' };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    // this.navCtrl.push(ListPage);
    // this.navCtrl.push(ListPage);
    // this.navCtrl.push(ListPage);
  }

  Login(){
    this.required = true;
    if(this.registerCredentials.email){
      this.e_required = true;
    }

    if(this.registerCredentials.email != '' && this.registerCredentials.password != '' ){
      this.loading = this.loadingCtrl.create();
      this.loading.present();
      this.service.login(this.registerCredentials).then( res=>{
        this.loading.dismiss();
        if(res['state'] == 'success'){
          this.service.token = res['token'];
          this.navCtrl.setRoot(HomePage);
        }
        if(res['state'] == 'error'){
          this.service.showAlert(res['message']);
        }
      });
    }
  }

  forgotPassword(){
    this.navCtrl.push( ForgotPage, {
      email: this.registerCredentials.email
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
