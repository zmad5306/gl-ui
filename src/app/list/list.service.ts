import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Department } from './department';

@Injectable()
export class ListService {

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<Array<Department>> {
    return this.http.get('/api/dept/')
      .map((data) => data as Array<Department>);
  }

}
