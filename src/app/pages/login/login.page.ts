import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatasourceService } from 'src/app/services/datasource.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private datasource: DatasourceService,
    private loadingCtrl: LoadingService,
    private toast: ToasterService,
    private router: Router,
    ) { }
  email:string = "danilo_castelhano@thera.com.br";
  password:string = "123456";
  

  ngOnInit() {
  }

  async login() {
    if (!this.email) {
      this.toast.presentToast('Preencha o E-Mail', false)
    } else if (!this.password) {
      this.toast.presentToast('Preencha a Senha', false)
    } else {
      await this.loadingCtrl.ShowLoading();
      let body = {
        userID: this.email,
        accessKey: this.password,
        grantType: "password"
      }

      this.datasource.post('Accounts', body).subscribe(
        (res) => {
          localStorage.clear()
          localStorage.setItem('token', res['accessToken'])
          localStorage.setItem('name', res['name'])
          
        
          this.router.navigate(['/']);
          this.loadingCtrl.DismissLoading();
        },
        error => {
          this.loadingCtrl.loading.dismiss()
          this.toast.presentToast("Usuário ou Senha Inválidos \n", false);
          console.log('error login', error)
        }
      );
    }
  }

}
