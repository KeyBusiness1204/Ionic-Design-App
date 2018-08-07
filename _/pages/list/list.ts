import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { AddPage } from '../add/add';
import { EventDetailPage } from '../event-detail/event-detail';
import { MapPage } from '../map/map';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  pending: string ;
  selectedItem: any;
  icons: any = [];
  items: any = [];
  public loading: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController
  )
  {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = [
      { value : 'flask' , status: 'pending'},
      { value :'wifi', status: 'pending'},
      { value :'beer', status: 'unpending'},
      { value : 'football', status: 'pending'},
      { value :'basketball', status: 'unpending'}
    ];

    this.items = this.icons;
  }

  back(){
    this.navCtrl.setRoot(EventDetailPage);
  }

  addPage(){

  }

  refreshPage(){
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    this.loading.dismiss();
  }

  mapPage(item){
    this.navCtrl.push(MapPage, {
      item: item
    });
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(EventDetailPage, {
      item: item
    });
  }
  openHelp(){

  }
  contact(){

  }
}
