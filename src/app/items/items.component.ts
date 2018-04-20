import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
  styleUrls: ['./items.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
              private formBuilder: FormBuilder,
              private _ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.listId = params['listId'];
      this.listsService.getList(this.listId).subscribe((list: List) => {
        this.list = list[0];
        this._ref.markForCheck();
      });
      this.itemService.getItems(this.listId).subscribe((items: Array<Item>) => {
        this.items = items;
        this._ref.markForCheck();
      });
    });
    this.departmentService.getDepartments().subscribe((departments: Array<Department>) => {
      this.departments = departments;
      this._ref.markForCheck();
    });
    this.createItemForm = this.formBuilder.group({
      name: '',
      departmentId: '',
      quantity: ''
    });
  }

  commit(){
    this.createItemForm.value.active = true;
    this.itemService.saveItem(this.createItemForm.value).subscribe(data => console.log(data));
    this.createItemForm.reset();
  }
}
