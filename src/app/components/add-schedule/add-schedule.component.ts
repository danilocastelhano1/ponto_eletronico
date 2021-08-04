import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DatasourceService } from 'src/app/services/datasource.service';
import { LoadingService } from 'src/app/services/loading.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss'],
})
export class AddScheduleComponent implements OnInit {
  today = Date.now();
  public form: FormGroup;
  datePipe = new DatePipe('en-US');

  constructor(
    public formBuilder: FormBuilder,
    private datasource: DatasourceService,
    private loadingCtrl: LoadingService,
    private util: UtilService
  ) { }

  ngOnInit() {
    this.createForm();
    this.getLastId();
    setInterval(() => {
      this.today = Date.now();
    }, 500);
  }

  createForm() {
    this.form = this.formBuilder.group({
      id: new FormControl(0, []),
      data: new FormControl('', []),
      dataCompleta: new FormControl('', []),
      horaInicio: new FormControl('', []),
      almocoInicio: new FormControl('', []),
      almocoInicioCompleto: new FormControl('', []),
      almocoFim: new FormControl('', []),
      almocoFimCompleto: new FormControl('', []),
      horaFim: new FormControl('', []),
      horaFimCompleta: new FormControl('', []),
      tempoTotal: new FormControl('', []),
    });
  }

  registraTime(index: number) {
    let data = new Date();
    switch (index) {
      case 1: {
        this.form.get('data').setValue(this.datePipe.transform(data, "dd/MM/yyyy"));
        this.form.get('dataCompleta').setValue(data);

        this.form.get('horaInicio').setValue(this.datePipe.transform(data, "HH:mm:ss"));
        this.storeInDB();
        break;
      }
      case 2: {
        this.form.get('almocoInicio').setValue(this.datePipe.transform(data, "dd/MM/yyyy HH:mm:ss"));
        this.form.get('almocoInicioCompleto').setValue(data);
        this.storeInDB();
        break;
      }
      case 3: {
        this.form.get('almocoFim').setValue(this.datePipe.transform(data, "dd/MM/yyyy HH:mm:ss"));
        this.form.get('almocoFimCompleto').setValue(data);
        this.storeInDB();
        break;
      }
      case 4: {
        this.form.get('horaFim').setValue(this.datePipe.transform(data, "HH:mm:ss"));
        this.form.get('horaFimCompleta').setValue(data);
        this.storeInDB();
        this.getFinalHour();
        break;
      }
    }
  }
  async storeInDB() {
    await this.loadingCtrl.ShowLoading();

    let body = {
      start: this.form.get('dataCompleta').value,
      startLunch: this.form.get('almocoInicioCompleto').value,
      endLunch: this.form.get('almocoFimCompleto').value,
      end: this.form.get('horaFimCompleta').value
    }

    if (this.form.get('id').value == 0) {
      this.datasource.post('Timesheet', body).subscribe(
        (res) => {
          this.getLastId();
          this.loadingCtrl.DismissLoading();
        },
        (err) => {
          console.log('error', err);
          this.loadingCtrl.DismissLoading();
        }
      );
    }
    else {
      this.datasource.put('Timesheet/' + this.form.get('id').value + '/', body).subscribe(
        (res) => {
          this.getLastId();
          this.loadingCtrl.DismissLoading();
        },
        (err) => {
          console.log('error', err);
          this.loadingCtrl.DismissLoading();
        }
      );
    }
  }

  getLastId() {
    this.datasource.get('Timesheet').subscribe(
      (res) => {
        let d = new Date()
        if (this.datePipe.transform(d, "dd/MM/yyyy") === this.datePipe.transform(res.items[0].start, "dd/MM/yyyy")) {
          this.form.get('id').setValue(res.items[0].id);

          this.form.get('data').setValue(this.datePipe.transform(res.items[0].start, "dd/MM/yyyy"));
          this.form.get('dataCompleta').setValue(res.items[0].start);
          this.form.get('horaInicio').setValue(this.datePipe.transform(res.items[0].start, "HH:mm:ss"));

          this.form.get('almocoInicio').setValue(this.datePipe.transform(res.items[0].startLunch, "dd/MM/yyyy HH:mm:ss"));
          this.form.get('almocoInicioCompleto').setValue(res.items[0].startLunch);

          this.form.get('almocoFim').setValue(this.datePipe.transform(res.items[0].endLunch, "dd/MM/yyyy HH:mm:ss"));
          this.form.get('almocoFimCompleto').setValue(res.items[0].endLunch);

          this.form.get('horaFim').setValue(this.datePipe.transform(res.items[0].end, "HH:mm:ss"));
          this.form.get('horaFimCompleta').setValue(res.items[0].end);

          this.getFinalHour();
        }
      },
      (err) => {
        this.form.get('id').setValue(0);
      });
  }

  getFinalHour() {
    let horaFinal = this.util.getOfficeHourInterval(
      this.datePipe.transform(this.form.get('dataCompleta').value, "HH:mm:ss"),
      this.datePipe.transform(this.form.get('horaFimCompleta').value, "HH:mm:ss"),
      this.datePipe.transform(this.form.get('almocoInicioCompleto').value, "HH:mm:ss"),
      this.datePipe.transform(this.form.get('almocoFimCompleto').value, "HH:mm:ss"))
    this.form.get('tempoTotal').setValue(horaFinal =="Invalid date"? "": horaFinal);
  }
}
