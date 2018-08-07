import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, LoadingController, ViewController,NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { EventDetailPage } from '../event-detail/event-detail';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {
  added : boolean = false;
  found: boolean = true;
  status: string = 'unpending';
  count: number;
  date: string;
  id: string = '';

  airline: any;
  connect_airline1: any;
  connect_airline2: any;
  connect_airline3: any;
  connect_airline4: any;

  flight_number: number;
  connecting_number1: number;
  connecting_number2: number;
  connecting_number3: number;
  connecting_number4: number;

  connect_code: string;
  connect_code1: string;
  connect_code2: string;
  connect_code3: string;
  connect_code4: string;

  flight_status: string;
  flight_status1: string;
  flight_status2: string;
  flight_status3: string;
  flight_status4: string;

  airlines : any = [];
  connect_airlines : any = [];
  flights : any = [];
  Connects : any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public service :  ServiceProvider,
    private alertCtrl: AlertController
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

    this.airlines = this.navParams.get('data');
    this.connect_airlines = this.navParams.get('data');
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
    console.log(this.Connects);
    this.service.connects = this.Connects;

    this.service.saveFlights(this.service.token, this.date, this.count, this.connect_code, this.flight_number, this.connect_code1, this.connecting_number1,
    this.connect_code2, this.connecting_number2, this.connect_code3, this.connecting_number3, this.connect_code4, this.connecting_number4
    ).then(res =>{
      console.log(res);
      if(res['state'] == 'success')
        this.navCtrl.setRoot(EventDetailPage);
    });;

  }

  get_flight(){
    if(this.connect_code != undefined && this.airline!= undefined  && this.date!= undefined )
       this.get_flights(this.connect_code, this.flight_number, this.date).then(
        res =>{
          console.log(JSON.stringify(res));
          this.flight_status = res['status'];
        }
      );;
  }
  get_flight1(){
    if(this.connect_code1 != undefined && this.connect_airline1!= undefined  && this.date!= undefined )
    this.get_flights(this.connect_code1, this.connecting_number1, this.date).then( res =>{
      this.flight_status1 =  res['status'];
    });
    }
  get_flight2(){
    if(this.connect_code2 != undefined && this.connect_airline2!= undefined  && this.date!= undefined )
      this.get_flights(this.connect_code2, this.connecting_number2 , this.date).then( res =>{
        this.flight_status2 = res['status'];
      });

  }
  get_flight3(){
    if(this.connect_code3 != undefined && this.connect_airline3!= undefined  && this.date!= undefined )
      this.get_flights(this.connect_code3, this.connecting_number3, this.date).then( res =>{
        this.flight_status3 = res['status'];
      });

  }
  get_flight4(){
    if(this.connect_code4 != undefined && this.connect_airline4!= undefined  && this.date!= undefined )
      this.get_flights(this.connect_code4, this.connecting_number4, this.date).then( res =>{
        this.flight_status4 = res['status'];
      });
  }


  setNumber(air_line){
    this.airline = air_line.name;
    this.connect_code = air_line.code;
  }
  setNumber1(air_line1){
    this.connect_airline1 = air_line1.name;
    this.connect_code1 = air_line1.code;
  }
  setNumber2(air_line2){
    this.connect_airline2 = air_line2.name;
    this.connect_code2 = air_line2.code;
  }
  setNumber3(air_line3){
    this.connect_airline3 = air_line3.name;
    this.connect_code3 = air_line3.code;
  }
  setNumber4(air_line4){
    this.connect_airline4 = air_line4.name;
    this.connect_code4 = air_line4.code;
  }

  addFlight(){
    if(this.found != false){
      this.added = true;
      this.date = this.format(this.date);
    }
  }

  get_flights(code, flight_num, date){
    return new Promise(resolve => {
      this.service.getFlights(code, flight_num, date).then( res =>{
        console.log(res);
        if(res['state'] == 'error'){
          this.found = false;
          this.service.showAlert(res['message']);
        }
        else{
          this.found = true;
          this.setConnects(res['name'], res['number'], res['status']);
          resolve(res);
        }
      });
    });
  }

  setConnects(airline, number, status){
    var connect = {
      g_airline : airline,
      g_flight_num: number,
      status: status
    }
    this.Connects.push(connect);
  }

  format(inputDate) {
    var date = new Date(inputDate);
    if (!isNaN(date.getTime())) {
        // Months use 0 index.
        return date.getFullYear()+ '-' + date.getMonth() + 1 + '-' + date.getDate();
    }
  }

  changeSelect(selector){
    console.log(selector);
  }

  openHelp(){

  }
  contact(){

  }

  mainCalendar(){
    this.navCtrl.setRoot(HomePage, {
      event : false,
      calendar : true
    });
  }
}
