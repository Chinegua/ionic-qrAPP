import { Component } from '@angular/core';
import {  NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the MapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {

  lat: number;
  lng: number;

  constructor( public navParams: NavParams, public viewCtrl: ViewController) {
    this.lat = Number(this.navParams.get("coords").split(",")[0].split(":")[1]) ;
    this.lng = Number(this.navParams.get("coords").split(",")[1]);

    console.log("latirud: "+this.lat+"longitud"+this.lng)
  }

  cerrarMapa(){
    this.viewCtrl.dismiss();
  }


}
