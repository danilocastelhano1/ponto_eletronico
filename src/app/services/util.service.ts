import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  getOfficeHourInterval(startTime, endTime, lunchS, LunchE) {
    var start = moment.utc(startTime, "HH:mm:ss");
    var end = moment.utc(endTime, "HH:mm:ss");

    var _lunchS = moment.utc(lunchS, "HH:mm:ss");
    var _lunchEnd = moment.utc(LunchE, "HH:mm:ss");

    // account for crossing over to midnight the next day
    if (end.isBefore(start)) end.add(1, 'day');

    // calculate the duration
    var lunchBreak = moment.duration(_lunchEnd.diff(_lunchS));
    var officeHours = moment.duration(end.diff(start));


    // subtract the lunch break
    officeHours.subtract(lunchBreak);

    // format a string result
    var _result = moment.utc(+officeHours).format('HH:mm:ss');
    return _result
  }
}
