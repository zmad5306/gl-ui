import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginInterceptorService } from './login/login-interceptor.service';
import { LoginService } from './login/login.service';
import { ListComponent } from './list/list.component';
import { ListService } from './list/list.service';

const appRoutes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/list', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptorService,
      multi: true
    },
    LoginService,
    ListService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
