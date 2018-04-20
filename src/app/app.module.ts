import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {LoginInterceptorService} from './login/login-interceptor.service';
import {LoginService} from './login/login.service';
import {ListsComponent} from './lists/lists.component';
import {ListsService} from './lists/lists.service';
import {ItemsComponent} from './items/items.component';
import {ItemService} from './items/item.service';
import {DepartmentService} from "./shared/department.service";
import { DepartmentPipe } from './items/department.pipe';

const appRoutes: Routes = [
  {path: 'lists', component: ListsComponent},
  {path: 'lists/:listId/items', component: ItemsComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: '/lists', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListsComponent,
    ItemsComponent,
    DepartmentPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptorService,
      multi: true
    },
    LoginService,
    ListsService,
    ItemService,
    DepartmentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
