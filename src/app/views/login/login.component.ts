import { Component, NgModule, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-view',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginPageComponent implements OnInit {
  @NgModule({
    declarations: [

    ],
    imports: [

    ],
    exports: [

    ],
  })
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  constructor() { }
  ngOnInit(): void {
  }

  onLogin(loginForm: any) {
  }
}
