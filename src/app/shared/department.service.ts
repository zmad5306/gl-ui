import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Department} from "./department";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/empty';

@Injectable()
export class DepartmentService {

  constructor(private http: HttpClient) {
  }

  getDepartments(): Observable<Array<Department>> {
    return this.http.get(`/api/dept/`).map(data => data as Array<Department>);
  }


}
