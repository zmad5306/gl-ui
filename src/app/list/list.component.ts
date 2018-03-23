import { ListService } from './list.service';
import { Component, OnInit } from '@angular/core';
import { Department } from './department';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  departments: Array<Department>

  constructor(private listService: ListService) { }

  ngOnInit() {
    this.listService.getDepartments().subscribe((departments: Array<Department>) => {
      this.departments = departments;
    });
  }

}
