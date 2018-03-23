import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/empty';
import { List } from '../shared/list';

@Injectable()
export class ListsService {

  constructor(private http: HttpClient) { }

  getLists(): Observable<Array<List>> {
    return this.http.get('/api/list/').map((data) => data as Array<List>);
  }

  getList(listId: string): Observable<List> {
    return this.http.get('/api/list/${listId}').map((data) => data as List);
  }

  saveList(list: List): Observable<List> {
    return this.http.post('/api/list/', list).map((data) => data as List);
  }

  updateList(list: List): Observable<void> {
    return this.http.put('/api/list/${list.listId}', list).switchMap(() => Observable.empty<void>());
  }

  deleteList(list: List): Observable<void> {
    return this.http.delete('/api/list/${list.listId}').switchMap(() => Observable.empty<void>());
  }

}
