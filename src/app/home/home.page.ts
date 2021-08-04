import { Component, OnInit } from '@angular/core';
import { Router,NavigationStart  } from '@angular/router';
import { filter } from 'rxjs/operators'
import { DatasourceService } from '../services/datasource.service';
import { LoadingService } from '../services/loading.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  
  constructor(
    private datasource: DatasourceService,
    private loadingCtrl: LoadingService,
    private toast: ToasterService,
    private router: Router,
  ) {
    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationStart)
    // ).subscribe((route: NavigationStart) => {
    //   if(route.url === "/"){
    //     this.getSchedules()
    //   }
    // })
  }

  ngOnInit(){
    
  }
  getName(){
    return localStorage.getItem('name')
  }

  logout(){
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  

}
