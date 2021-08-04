import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DatasourceService } from 'src/app/services/datasource.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-list-schedules',
  templateUrl: './list-schedules.component.html',
  styleUrls: ['./list-schedules.component.scss'],
})
export class ListSchedulesComponent implements OnInit {
  schedules = [];

  constructor(
    private datasource: DatasourceService,
    private loadingCtrl: LoadingService,
    private util: UtilService,
    private toast: ToasterService,
    private router: Router,
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((route: NavigationStart) => {
      if(route.url === "/"){
        this.getSchedules();       
      }
    })
   }

  ngOnInit() {
    this.getSchedules();
  }


  async getSchedules(){
    await this.loadingCtrl.ShowLoading();

    this.datasource.get('Timesheet').subscribe(
      (res)=>{
        this.schedules = res.items;
        this.schedules.forEach(
          (item)=>{
            var datePipe = new DatePipe('en-US');
            //start
            var start = new Date(item.start);
            item["start_date"] = datePipe.transform(start, "dd/MM/yyyy")
            //start hora_inicio
            var start = new Date(item.start);
            item["start_time"] = datePipe.transform(start, "HH:MM:ss")

            //start lunch
            if (item.startLunch){
              var start_lunch = new Date(item.startLunch);
              item["start_lunch"] = datePipe.transform(start_lunch, "dd/MM/yyyy HH:mm:ss")
            }

            //end lunch
            if (item.endLunch){
              var end_lunch = new Date(item.endLunch);
              item["end_lunch"] = datePipe.transform(end_lunch, "dd/MM/yyyy HH:mm:ss");
            }
            //end hour
            if (item.end){
              var end = new Date(item.end);
              item["end_hour"] = datePipe.transform(end, "HH:mm:ss");
            }
            //total hours
            item['total_hours'] = this.util.getOfficeHourInterval(
              datePipe.transform(start, "HH:mm"), 
              datePipe.transform(end, "HH:mm"),
              datePipe.transform(start_lunch, "HH:mm"), 
              datePipe.transform(end_lunch, "HH:mm"));

            this.loadingCtrl.DismissLoading();
          }
        )
      },
      (err)=>{
        console.log('err', err);
        this.loadingCtrl.DismissLoading();
        this.toast.presentToast('Erro ao Localizar Registros', false);
        this.router.navigate(['/login']);
      }
    ); 

  }
}
