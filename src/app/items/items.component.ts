import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemService} from './item.service';
import {Item} from '../shared/item';
import {ListsService} from '../lists/lists.service';
import {List} from '../shared/list';
import {DepartmentService} from '../shared/department.service';
import {Department} from '../shared/department';
import {FormBuilder, FormGroup} from '@angular/forms';

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
              private router: Router,
              private itemService: ItemService,
              private listsService: ListsService,
              private departmentService: DepartmentService,
              private formBuilder: FormBuilder,
              private _ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.listId = params['listId'];
      this.listsService.getList(this.listId).subscribe((list: List) => {
        this.list = list;
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

  trackByItems(index: number, item: Item): string { return item.itemId; }

  deleteList(): void {
    this.listsService.deleteList(this.list).subscribe(data => console.log(data));
    this.router.navigate(['/lists']);
  }

  markInActive(): void {
    console.log('working');
  }

  deleteItem(item: Item): void {
    this.itemService.deleteItem(item.itemId).subscribe(
      () => {},
      () => {},
      () => {
        this.itemService.getItems(this.listId).subscribe((items: Array<Item>) => {
          this.items = items;
          this._ref.markForCheck();
        });
      });
  }

  commit(): void {
    this.createItemForm.value.active = true;
    this.createItemForm.value.listId = this.listId;
    this.itemService.saveItem(this.createItemForm.value).subscribe(data => {
      this.itemService.getItems(this.listId).subscribe((items: Array<Item>) => {
        this.items = items;
        this._ref.markForCheck();
      });
    });
    this.createItemForm.reset();
  }
}
