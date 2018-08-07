import { Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage, ModalController, AlertController, ViewController, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { FlightsComponent } from '../../components/flights/flights';
import { ListPage } from '../../pages/list/list';
import { HomePage } from '../home/home';

declare var google;
@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  @ViewChild('googlemap') mapElement: ElementRef;
  map: any;
  airline: any;
  flight_num: any;
  next: boolean = true;
  tab: boolean = true;
  added_flight: boolean= false;
  flights : any = [];
  messages : any = [];
  comment : string;
  flight_status : string;
  msg_confirmID : string;
  status: string = 'unpending';
  count: number;
  index : number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public service :  ServiceProvider,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController
  )
  {
    this.flights = this.service.connects;
    this.count =  this.flights.length;
    console.log(' EventDetailPage');
  }

  ionViewCanEnter(){
    console.log('ionViewCanEnter EventDetailPage');
    if(this.service.added_event == true){
      this.added_flight = true;
      this.airline = this.service.connects[this.index].g_airline;
      this.flight_num = this.service.connects[this.index].g_flight_num;
      this.flight_status = this.service.connects[this.index].status;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailPage');
    this.map_Page(11.54, 104.892);
  }

  nextFlight(){
    this.index++;
    if(this.index < this.count){
      this.airline = this.flights[this.index].g_airline;
      this.flight_num = this.flights[this.index].g_flight_num;
      this.flight_status = this.flights[this.index].status;
      if(this.index == this.count - 1){
        this.next = false;
      }
    }
  }

  prevFlight(){
    this.index--;
    if(this.index >= 0){
      this.airline = this.flights[this.index].g_airline;
      this.flight_num = this.flights[this.index].g_flight_num;
      this.flight_status = this.flights[this.index].status;
      if(this.index == 0)
        this.next = true;
    }
  }

  back(){
    this.navCtrl.push(ListPage);
  }

  addEvent(){
    let linkModal = this.modalCtrl.create( FlightsComponent,{
      showBackdrop: true
    });
    linkModal.present();
  }

  editEvent(){

  }

  tabSelect(){

  }

  load_Map(){
    this.tab = true;
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  map_Page(lat, lng){

    let latLng = new google.maps.LatLng(lat, lng);
    let mapOptions = {
        center: latLng,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.add_Marker(lat, lng);
  }

  add_Marker(lat, lng)
  {
    // var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
    var marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: {lat: lat, lng: lng},
      // icon: image,
    });

    this.addInfoWindow(marker, "Location");
  }

  addInfoWindow(marker, content)
  {
      let infoWindow = new google.maps.InfoWindow({
          content: content
      });

      google.maps.event.addListener(marker, 'click', () => {
          infoWindow.open(this.map, marker);
      });
  }

  messageHistory(){
    this.tab = false;
    this.service.loadingDisplay();

    this.service.getMessage().then( res=>{
      res = {"status": 200, "state": "success", "message":"No Message History"
         };
      this.service.loadingDismiss();
      if(res['state'] == 'success'){
        console.log(res['message'].length);
        if( res['message'] != "No Message History")
          this.messages = res['message']
        if( res['message'] == "No Message History")
          this.service.showAlert(res['message']);
      }
    });
  }

  sendMessage(){
    this.service.postMessage(this.comment).then( res=>{
      if(res['state'] == 'success'){
          this.showMsgAlert(res['message']);
          this.msg_confirmID = res['message'];
      }
    });
  }

  openHelp(){

  }

  contact(){

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

  mainCalendar(){
    this.navCtrl.setRoot(HomePage, {
      event : false,
      calendar : true
    });
  }
}
