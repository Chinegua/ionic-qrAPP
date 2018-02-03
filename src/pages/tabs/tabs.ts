import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage, GuardadoPage } from "../index.paginas";
/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1:any = HomePage ;
  tab2:any = GuardadoPage;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }



}
