import {ChangeDetectorRef, Pipe, PipeTransform} from '@angular/core';
import {DepartmentService} from "../shared/department.service";
import {Department} from "../shared/department";
import {Item} from "../shared/item";

@Pipe({
  name: 'department',
  pure: false
})

export class DepartmentPipe implements PipeTransform {

  departmentValue: Array<Department>;
  callCount: number = 0;

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
    } else if(this.departmentValue && this.callCount === 1) {
      return this.departmentValue[0].name;
    }
  }

}
