import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public loading;
  constructor(private loadingCtrl: LoadingController,) { }

  async ShowLoading(){
    this.loading = await this.loadingCtrl.create({message: "Por favor Aguarde..."});
    return this.loading.present();
  }

  async DismissLoading(){
    this.loading = await this.loadingCtrl.dismiss();
  }
}
