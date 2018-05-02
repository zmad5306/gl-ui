import {ChangeDetectorRef, Pipe, PipeTransform} from '@angular/core';
import {DepartmentService} from './department.service';
import {Department} from './department';
import {Item} from './item';

@Pipe({
  name: 'department',
  pure: false
})

export class DepartmentPipe implements PipeTransform {

  departmentValue: Department;
  callCount = 0;

  constructor(
    private departmentService: DepartmentService,
    private _ref: ChangeDetectorRef
  ) {}

  transform(item: Item): string {
    if (!this.departmentValue && this.callCount === 0) {
      this.callCount++;
      this.departmentService.getDepartment(item.links.find(link => link.title === 'dept').href).subscribe(data => {
        this.departmentValue = data;
        this._ref.markForCheck();
      });
    } else if (this.departmentValue && this.callCount === 1) {
      return this.departmentValue.name;
    }
  }

}
