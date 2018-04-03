import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const headers = {
  headers: new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
};

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post('/api/login',
          body.toString(),
          headers
        );
  }

}
