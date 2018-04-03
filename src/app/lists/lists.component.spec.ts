import { ListsService } from './lists.service';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsComponent } from './lists.component';
import { Router, RouterModule } from '@angular/router';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

const listServiceStub = {
  getLists: () => Observable.of()
} as ListsService;

describe('ListsComponent', () => {
  let component: ListsComponent;
  let fixture: ComponentFixture<ListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsComponent ],
      imports: [
        ReactiveFormsModule,
        RouterModule,
      ],
      providers: [
        { provide: ListsService, useValue: listServiceStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
