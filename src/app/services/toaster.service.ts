import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private _toast:any;
  constructor(private toastCtrl: ToastController) { }
  
  presentToast(message, success: boolean){
    this._toast = this.toastCtrl.create({
      color: success ? "success" : "danger",
      message,
      duration: 2000
    }).then((toastData) => {
      toastData.present();
    });
    
  }
  dismisToast(){
    this.toastCtrl.dismiss();
  }
}

export function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};
