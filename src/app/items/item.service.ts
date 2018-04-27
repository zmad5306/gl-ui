import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Item } from '../shared/item';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/empty';
import {ReplaySubject} from "rxjs/ReplaySubject";

@Injectable()
export class ItemService {
  private _reloadItems = new ReplaySubject<boolean>();
  reloadItems$ = this._reloadItems.asObservable().switchMap((listId) => {
    return this.refreshItems(listId);
  });

  constructor(private http: HttpClient) { }

  refreshItems(listId) {
    return this.getItems(listId);
  }

  itemChanged(): void {
    this._reloadItems.next(true);
  }

  getItems(listId: string): Observable<Array<Item>> {
    return this.http.get(`/api/item/${listId}`).map(data => data as Array<Item>);
  }

  getItemsByDept(listId: string, departmentId: string): Observable<Array<Item>> {
    return this.http.get(`/api/item/${listId}/${departmentId}`).map(data => data as Array<Item>);
  }

  saveItem(item: Item): Observable<Item> {
    return this.http.post(`/api/item/${item.listId}/${item.departmentId}`, item).map(data => data as Item);
  }

  updateItem(item: Item): Observable<void> {
    return this.http.put(`/api/item/${item.itemId}`, item).switchMap(() => Observable.empty<void>());
  }

  deleteItem(itemId: string): Observable<void> {
    return this.http.delete(`/api/item/${itemId}`).switchMap(() => Observable.empty<void>());
  }

}
