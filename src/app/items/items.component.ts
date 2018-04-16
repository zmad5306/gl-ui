import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItemService} from './item.service';
import {Item} from '../shared/item';
import {ListsService} from '../lists/lists.service';
import {List} from '../shared/list';
import {DepartmentService} from "../shared/department.service";
import {Department} from "../shared/department";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  listId: string;
  list: List;
  items: Array<Item>;
  departments: Array<Department>;
  createItemForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private itemService: ItemService,
              private listsService: ListsService,
              private departmentService: DepartmentService,
              private formBuilder: FormBuilder) {
  }

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
    this.departmentService.getDepartments().subscribe((departments: Array<Department>) => {
      this.departments = departments;
      console.log(this.departments);
    });
    this.createItemForm = this.formBuilder.group({
      name: '',
      departmentsList: ''
    });
  }
}
