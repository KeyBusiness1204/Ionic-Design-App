import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
declare var google;
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  public map: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.loadMap(53.2734, -7.77832);
  }

  back(){
    this.navCtrl.pop();
  }

  loadMap(lat, lng){
    let latLng = new google.maps.LatLng(lat, lng);
    let mapOptions = {
        center: latLng,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker(lat, lng);
  }

  addMarker(lat, lng)
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
}
