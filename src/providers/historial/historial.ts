import { Injectable } from '@angular/core';
import { ScanData } from "../../models/scandata.model";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ModalController, Platform } from 'ionic-angular';
import { MapsPage } from "../../pages/maps/maps";
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { ToastController } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';




/*
  Generated class for the HistorialProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HistorialProvider {

  private historial:ScanData[] = [];
  constructor(private iab: InAppBrowser, private modalCtrl:ModalController, private contacts: Contacts, private platform:Platform, public toastCtrl: ToastController, private emailComposer: EmailComposer) {

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
    console.log("ScanData1: "+scanData.info);
    switch(scanData.tipo){
      case 'http':
        this.iab.create(scanData.info,"_system");
      break;
      case 'mapa':
        console.log("scandata.info: "+scanData.info)
        this.modalCtrl.create(MapsPage,{ coords:scanData.info }).present()
      break;
      case 'contacto':
        
        this.crearContacto(scanData.info);
      break;
      case 'mail':
        this.sendMail(scanData.info)
      break;

      default:
        console.log("Tipo no soportado");
    }
  }
  private sendMail(info:any){
   // MATMSG:TO:aitorbernalfalcon95@gmail.com;SUB:compra;BODY:aedfvfvf;;
    let correo = info.split(";")[0].split(":")[2];
    let asunto = info.split(";")[1].split(":")[1];
    let body = info.split(";")[2].split(":")[1];

    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        //Now we know we can send
      }
     });
     
     let email = {
       to: correo,
       subject: asunto,
       body: body,
       isHtml: true
     };
     
     // Send a text message using default options
     this.emailComposer.open(email);


  }
  private crearContacto(texto:string){
    let campos:any = this.parse_vcard(texto);
    console.log(campos.fn);
    let nombre = campos.fn;
    let tel = campos.tel[0].value[0];
    if(!this.platform.is("cordova")){
      console.log("Estoy en el PC, no se puede crear contacto");
      return;
    }
    let contact: Contact = this.contacts.create();
    contact.name = new ContactName(null,nombre);
    contact.phoneNumbers = [new ContactField("mobile",tel)];
    contact.save().then(
      () => this.contactoCreadoTOAST(),

    );
  }
  private contactoCreadoTOAST(){
    let toast = this.toastCtrl.create({
      message: 'Usuario añadudo de forma correcta',
      duration: 3000
    });
    toast.present();
  
  }

  private parse_vcard( input:string ) {

    var Re1 = /^(version|fn|title|org):(.+)$/i;
    var Re2 = /^([^:;]+);([^:]+):(.+)$/;
    var ReKey = /item\d{1,2}\./;
    var fields = {};

    input.split(/\r\n|\r|\n/).forEach(function (line) {
        var results, key;

        if (Re1.test(line)) {
            results = line.match(Re1);
            key = results[1].toLowerCase();
            fields[key] = results[2];
        } else if (Re2.test(line)) {
            results = line.match(Re2);
            key = results[1].replace(ReKey, '').toLowerCase();

            var meta = {};
            results[2].split(';')
                .map(function (p, i) {
                var match = p.match(/([a-z]+)=(.*)/i);
                if (match) {
                    return [match[1], match[2]];
                } else {
                    return ["TYPE" + (i === 0 ? "" : i), p];
                }
            })
                .forEach(function (p) {
                meta[p[0]] = p[1];
            });

            if (!fields[key]) fields[key] = [];

            fields[key].push({
                meta: meta,
                value: results[3].split(';')
            })
        }
    });

    return fields;
};

}
