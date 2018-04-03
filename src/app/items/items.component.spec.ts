import { Observable } from 'rxjs/Observable';
import { ListsService } from './../lists/lists.service';
import { ItemService } from './item.service';
import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'rxjs/add/observable/of';

import { ItemsComponent } from './items.component';

const activatedRouteStub = {
    params: Observable.of()
} as ActivatedRoute,
itemServiceStub = {} as ItemService,
listServiceStub = {} as ListsService;

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: ItemService, useValue: itemServiceStub },
        { provide: ListsService, useValue: listServiceStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
