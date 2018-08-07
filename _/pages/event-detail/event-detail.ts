import { Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage, ModalController, ViewController, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { FlightsComponent } from '../../components/flights/flights';
import { ListPage } from '../../pages/list/list';
declare var google;
@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  @ViewChild('googlemap') mapElement: ElementRef;
  map: any;
  status: string = 'unpending';
  chatParams = {
    user1: 'admin',
    user2: 'ionic'
  };
  next: boolean = true;
  tab: boolean = true;
  added_flight: boolean= false;
  airline: any;
  flight_num: any;
  count: number;
  comment: string = 'Lorem ipsum dolor sit amet, similique elaboraret eam in. Soluta ancillae ne mei, sea veri et dolor sit amet, similique ';
  flights : any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public service :  ServiceProvider,
    public viewCtrl: ViewController,
  )
  {
    this.flights = [
      {
        g_airline: 'American Airlines',
        g_flight_num: '1748'
      },
      {
        g_airline: 'Europe Airlines',
        g_flight_num: '1231'
      }
      ,
      {
        g_airline: 'Asia Airlines',
        g_flight_num: '4939'
      }
    ]
    this.count =  this.flights.length;
    console.log(' EventDetailPage');
  }
  ionViewCanEnter(){
    console.log('ionViewCanEnter EventDetailPage');
    if(this.service.added_event == true){
      this.added_flight = true;
      this.airline = this.service.g_airline;
      this.flight_num = this.service.g_flight_num;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailPage');
    this.map_Page(11.54, 104.892);
  }

  nextFlight(){
      this.count--;
      this.airline = this.flights[this.count].g_airline;
      this.flight_num = this.flights[this.count].g_flight_num;
      if(this.count == 1)
        this.next = false;
  }

  back(){
    this.navCtrl.push(ListPage);
  }
  addEvent(){
    let linkModal = this.modalCtrl.create( FlightsComponent,{
      showBackdrop: false
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
  }
  openHelp(){

  }
  contact(){

  }
}
