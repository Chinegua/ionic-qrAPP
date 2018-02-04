import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ToastController, Platform } from 'ionic-angular';
import { HistorialProvider } from "../../providers/historial/historial";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private barcodeScanner: BarcodeScanner, private toastCtrl: ToastController, private platform:Platform, private historialProvider:HistorialProvider) {

  }
  qrscan(){
    if(!this.platform.is('cordova')){
      //this.historialProvider.setHistorial('https://www.forocoches.com/');
      //this.historialProvider.setHistorial('geo:40.4146500,-3.7004000');
      /*this.historialProvider.setHistorial(`BEGIN:VCARD
      VERSION:2.1
      N:Kent;Clark
      FN:Clark Kent
      ORG:
      TEL;HOME;VOICE:12345
      TEL;TYPE=cell:67890
      ADR;TYPE=work:;;;
      EMAIL:clark@superman.com
      END:VCARD` );*/

      console.log(this.historialProvider.cargarHistorial());
      return;
    }
    this.barcodeScanner.scan().then((barcodeData) => {
      console.log(barcodeData)
      if(barcodeData.cancelled == false && barcodeData.text != null){
        this.historialProvider.setHistorial( barcodeData.text );
      }
     }, (err) => {
      this.presentToast(err);
     });
  }

  presentToast( mensaje:string) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }
}
