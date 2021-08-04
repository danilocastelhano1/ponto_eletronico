import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ListSchedulesComponent } from './list-schedules/list-schedules.component';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';


const COMPONENTS = [
  ListSchedulesComponent,
  AddScheduleComponent,
];

const ENTRY_COMPONENTS = [
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule.forRoot(),
    RouterModule, 
  ],
  exports: [
    ...COMPONENTS,
  ],
  declarations: [...COMPONENTS,],
})

export class ComponentsModule {
  
}
