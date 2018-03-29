import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from './item.service';
import { Item } from '../shared/item';
import { ListsService } from '../lists/lists.service';
import { List } from '../shared/list';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  listId: string;
  list: List;
  items: Array<Item>;

  constructor(private route: ActivatedRoute, private itemService: ItemService, private listsService: ListsService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.listId = params['listId'];
      this.listsService.getList(this.listId).subscribe((list: List) => {
        this.list = list[0];
      });
      this.itemService.getItems(this.listId).subscribe((items: Array<Item>) => {
        this.items = items;
      });
    });
  }

}
