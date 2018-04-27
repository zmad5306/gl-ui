import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Item } from '../shared/item';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/empty';

@Injectable()
export class ItemService {

  constructor(private http: HttpClient) { }


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
