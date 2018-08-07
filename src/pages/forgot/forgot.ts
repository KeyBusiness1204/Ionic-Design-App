import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
})
export class ForgotPage {

  email: any;
  constructor(public navCtrl: NavController, public navParams: NavParams)
  {
    this.email = this.navParams.get('email');
    console.log(this.email);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPage');
  }

}
