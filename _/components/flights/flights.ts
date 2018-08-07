import { Component } from '@angular/core';
import { AddPage } from '../../pages/add/add';
import { NavController, LoadingController, ViewController, NavParams } from 'ionic-angular';
@Component({
  selector: 'flights',
  templateUrl: 'flights.html'
})
export class FlightsComponent {

  status: string = 'unpending';
  counts: any = [];
  count: number;
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
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
    this.navCtrl.push(AddPage, {
      count: this.count
    });
  }
}
