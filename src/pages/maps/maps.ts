import { Component } from '@angular/core';
import {  NavParams } from 'ionic-angular';

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

  constructor( public navParams: NavParams) {
    this.lat = 40.7127837 ;
    this.lng = -74.00594130000002;
  }



}
