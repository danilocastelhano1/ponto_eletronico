import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatasourceService {
  httpHeadersAuth = new HttpHeaders({
    'Content-type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  constructor(public http: HttpClient) {}

  post(url: String, body = {}): Observable<any> {
    return this.http.post(environment.url_base + url, body, {
      headers: this.httpHeadersAuth,
    });
  }

  put(url: String, body = {}): Observable<any> {
    return this.http.put(environment.url_base + url, body, {
      headers: this.httpHeadersAuth,
    });
  }

  get(url: String): Observable<any> {
    return this.http.get<any>(environment.url_base + url, {
      headers: this.httpHeadersAuth,
    });
  }
}
