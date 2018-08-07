import { Component } from '@angular/core';
import { AddPage } from '../../pages/add/add';
import { ServiceProvider } from '../../providers/service/service';
import { NavController, LoadingController, ViewController, NavParams } from 'ionic-angular';
@Component({
  selector: 'flights',
  templateUrl: 'flights.html'
})
export class FlightsComponent {

  status: string = 'unpending';
  counts: any = [];
  count: number;
  loading: any;
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public service :  ServiceProvider,
    public loadingCtrl: LoadingController,
  )
  {
    this.counts = [1,2,3,4,5];
  }

  selectCount(count){
    console.log(count);
    this.count = count;
  }

  continue(){
    this.viewCtrl.dismiss();

    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.service.getAirlines().then( res =>{
      this.loading.dismiss();
      this.navCtrl.push(AddPage, {
        count: this.count,
        data: res
      });
    });
  }
}
