import {ListsService} from './lists.service';
import {Component, OnInit} from '@angular/core';
import {List} from '../shared/list';
import {FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  createListForm: FormGroup;

  lists: Array<List>;

  constructor(private listsService: ListsService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.listsService.getLists().subscribe((lists: Array<List>) => {
      this.lists = lists;
    });
    this.createListForm = this.formBuilder.group({
      name: ['', []],
    });
  }

  commit() {
    this.listsService.saveList(this.createListForm.value).subscribe(() => {
      this.listsService.getLists().subscribe((lists: Array<List>) => {
        this.lists = lists;
      });
      this.createListForm.reset();
    });
  }
}
