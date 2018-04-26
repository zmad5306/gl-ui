import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginError = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: [ null, Validators.required ],
      password: [ null, Validators.required ],
    });
  }

  login() {
    this.loginError = false;

    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    this.loginService.login(username, password).subscribe(
      () => {}, (error) => {
        this.loginError = true;
        this.loginForm.reset();
      },
      () => {
        this.router.navigateByUrl('list');
      }
    );
  }

}
