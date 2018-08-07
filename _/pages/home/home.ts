import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ListPage } from '../list/list';
import { AddPage } from '../add/add';
import { ToDoPage } from '../to-do/to-do';
import { EventDetailPage } from '../event-detail/event-detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public event: boolean = false;
  public calendar: boolean = true;
  public distance: string;
  constructor(
    public navCtrl: NavController,
    private iab: InAppBrowser,
  )
  {
    this.distance = "img_middle";
  }

  eventDetails(){
    this.navCtrl.push(EventDetailPage);
  }
  calendarEvent(){
    this.event = true;
    this.calendar = false;
  }

  toDo(){
    this.navCtrl.push(ToDoPage);
  }

  eventToday(){
    this.navCtrl.push(ListPage);
  }

  openHelp() {
    const browser = this.iab.create('https://engagemyclient.com/helpdesk');
    browser.show();
  }

  contact(){
    const browser = this.iab.create('https://engagemyclient.com/contact');
    browser.show();
  }
}
