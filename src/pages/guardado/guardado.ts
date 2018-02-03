import { Component } from '@angular/core';
import { HistorialProvider } from '../../providers/historial/historial';
import { ScanData } from '../../models/scandata.model';

/**
 * Generated class for the GuardadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-guardado',
  templateUrl: 'guardado.html',
})
export class GuardadoPage {

  historial:ScanData[] = [];

  constructor(private historialProvider:HistorialProvider) {
  }


  ionViewDidLoad() {
    this.historial = this.historialProvider.cargarHistorial();
  }

  abrirScan(i:number){
    this.historialProvider.abrirScaner(i);
  }

}
