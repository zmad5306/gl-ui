import { ListsService } from './../lists/lists.service';
import { Component, OnInit } from '@angular/core';
import { List } from '../shared/list';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  lists: Array<List>;

  constructor(private listsService: ListsService) { }

  ngOnInit() {
    this.listsService.getLists().subscribe((lists: Array<List>) => {
      this.lists = lists;
    })
  }

}
