import { Injectable } from '@angular/core';
import { ScanData } from "../../models/scandata.model";
import { InAppBrowser } from '@ionic-native/in-app-browser';

/*
  Generated class for the HistorialProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HistorialProvider {

  private historial:ScanData[] = [];
  constructor(private iab: InAppBrowser) {

  }
  cargarHistorial(){
    return this.historial;
  }
  setHistorial( texto:string ){
    let data = new ScanData( texto );
    this.historial.unshift(data);
    console.log(this.historial);
    this.abrirScaner(0);
  }

  abrirScaner( index:number ){
    let scanData = this.historial[index];
    console.log(scanData);

    switch(scanData.tipo){
      case 'http':
        this.iab.create(scanData.info,"_system");
      break

      default:
        console.log("Tipo no soportado");
    }
  }

}
