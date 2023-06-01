import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isloggin = false
  constructor(private authService: AuthService, private readonly authservice: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.authservice.user.subscribe((us: User) => {
      if (us.username && this.isloggin == false) {
        this.router.navigate(['/'])
      }
      this.authService.getUsers().subscribe(() => {
        if (this.authService.getUserByCookie()) {
          this.router.navigate(['/'])
        }
      })
    })
  }


  public signIn(): void {
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container')!;
    container.classList.remove("right-panel-active");
  }

  public signUp(): void {
    const signUpButton = document.getElementById('signUp');
    const container = document.getElementById('container')!;
    container.classList.add("right-panel-active");
  }

  public Login(): void {

    this.isloggin = true
    let username = <HTMLInputElement>document.getElementById("username")
    let password = <HTMLInputElement>document.getElementById("password")

    if (username.value != "" && password.value != "") {
      this.authService.loginUser(username.value, password.value).subscribe((res: any) => {
        console.log(res)
        this.authService.user.next(res.user)
        this.authservice.setCookie(res.token)
      })
    }
  }

  public register(): void {

    this.isloggin = true
    let name = <HTMLInputElement>document.getElementById("nameR")
    let lastname = <HTMLInputElement>document.getElementById("lastnameR")
    let username = <HTMLInputElement>document.getElementById("usernameR")
    let email = <HTMLInputElement>document.getElementById("emailR")
    let password = <HTMLInputElement>document.getElementById("passwordR")

    if (username.value != "" && password.value != "") {
      const user = {
        name: name.value,
        lastname: lastname.value,
        username: username.value,
        email: email.value,
        password: password.value,
        photo: "default",
        created_at: new Date()
      }

      this.authservice.postUser(user).subscribe((res: any) => {
        this.authService.setCookie(res.token)
        this.authservice.user.next(res.user)

      })
    }
  }
}
