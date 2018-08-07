import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, ViewController,NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { EventDetailPage } from '../event-detail/event-detail';
@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {
  added : boolean = false;
  status: string = 'unpending';
  count: number;
  date: string;
  number: number;
  airline: any;
  connect_airline: any;
  flight_number: number;
  connecting: any;
  connecting_number: any;
  airlines : any = [];
  connect_airlines : any = [];
  today_date : string;
  id: string = '';
  flights : any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public service :  ServiceProvider,
  )
  {
    this.count = this.navParams.get('count');
    var datas = [];
    if(this.count > 1 ){
      this.id = 'line_dotted';
      for(var i = 1; i < this.count; i++) {
          datas.push(1);
      }
      this.flights = datas;
    }

    this.airlines = [ 'American Airlines', 'Europe Airlines', 'Asia Airlines'];
    this.connect_airlines = [ 'American Airlines', 'Europe Airlines', 'Asia Airlines'];
    this.todayDate(); 
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }

  todayDate(){
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!

      var yyyy = today.getFullYear();
      
      // var today = dd+'/'+mm+'/'+yyyy;
      // this.today_date = today;
  }
  back(){
    this.navCtrl.pop();
  }
  backButton(){
    this.added = false;
  }
  save(){
    this.service.added_event = true;
    this.service.g_airline = this.airline;
    this.service.g_flight_num = this.flight_number;
    this.navCtrl.setRoot(EventDetailPage);
  }
  addFlight(){
    this.added = true;
    console.log(this.connecting_number);
    console.log(this.flight_number);
    this.date = this.format(this.date);
    console.log(this.date);
    console.log(this.airline);
    console.log(this.connect_airline);
  }
  format(inputDate) {
    var date = new Date(inputDate);
    if (!isNaN(date.getTime())) {
        // Months use 0 index.
        return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
    }
  }
  openHelp(){

  }
  contact(){

  }
}
