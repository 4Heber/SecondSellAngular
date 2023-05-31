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
  private user: User = {} as User
  // BOOLEANO PARA IDENTIFICAR LA CARGA DE USUARIOS
  private loaded = false

  public isloggin = false
  // EN EL CONSTRUCTOR INICIALIZAMOS EL SERVICIO QUE CONTIENE LOS DATOS / FUNCIONES
  constructor(private authService: AuthService, private readonly authservice: AuthService, private router: Router) { }

  // AL CREAR EL COMPONENTE NOS SUSCRIBIMOS AL OBSERVABLE QUE RETORNA LA FUNCION GETUSERS
  ngOnInit(): void {
    this.authservice.user.subscribe((us: User) => {

      if (us.username && this.isloggin == false) {
        this.router.navigate(['/'])
      }
      this.authService.getUsers().subscribe(() => {

        if (this.authService.getUserByCookie()) {
          this.router.navigate(['/'])

        }
        else {
          this.authService.user.subscribe((us: User) => {
            if ((us.username)) {
              window.location.reload()

            }

          })

        }
      })
    })
    this.authservice.getUsers().subscribe(() => {
      // ESTO NOS ASEGURA QUE SE HAN CARGADO LOS USUARIOS
      this.loaded = true
    })

  }

  // FUNCIONES DE TRANSICIONES
  public signIn(): void {
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container')!;
    container.classList.remove("right-panel-active");
  }

  // FUNCIONES DE TRANSICIONES
  public signUp(): void {
    const signUpButton = document.getElementById('signUp');
    const container = document.getElementById('container')!;
    container.classList.add("right-panel-active");
  }

  // FUNCIONES DE LOGIN
  public Login(): void {
    this.isloggin = true
    // SI SE HAN CARGADO LOS USUARIOS...
    if (this.loaded = true) {
      let username = <HTMLInputElement>document.getElementById("username")
      let password = <HTMLInputElement>document.getElementById("password")


      if (username.value != "" && password.value != "") {

        // BUSCAMOS EL USUARIO
        const userIndex = this.authservice.usuarios.findIndex((us: User) => us.username === username.value && us.password === password.value);
        // EXTRAEMOS EL USUARIO
        this.user = this.authservice.usuarios[userIndex]


        // ASIGNAMOS EL TOKEN NUEVO GENERADO PREVIAMENTE (COOKIE), USAREMOS SANCTUM PARA ESTO Xd
        this.user.token = this.authservice.getCookie()

        // HACEMOS UN PUT AL USER PARA CAMBIAR EL TOKEN COSA Q NO HARA FALTA CON SANCTUM
        this.authservice.putUser(this.user, this.user.id!)

        // SETEAMOS LA COOKIE
        this.authservice.setCookie(this.user.token)

        // ACTULIZAMOS LOS CAMBIOS AL USER
        this.authservice.user.next(this.user)

        this.authservice.user.subscribe((us: User) => {

          if (us.username == username.value) {
            window.location.reload()
          }
        })

      }
    }

  }
  public register(): void {

    let name = <HTMLInputElement>document.getElementById("nameR")
    let lastname = <HTMLInputElement>document.getElementById("lastnameR")
    let username = <HTMLInputElement>document.getElementById("usernameR")
    let email = <HTMLInputElement>document.getElementById("emailR")
    let password = <HTMLInputElement>document.getElementById("passwordR")

    // GENERAMOS UNA COOKIE PARA EL USUARIO
    let token = this.authservice.getCookie()

    if (username.value != "" && password.value != "") {

      //CREAMEOS EL USUARIO EMPLEANDO SU INTERFAZ
      const user = {
        // id: 0,
        name: name.value,
        lastname: lastname.value,
        username: username.value,
        email: email.value,
        password: password.value,
        photo: "default",
        token: token,
        created_at: new Date()
      }

      if (!this.authservice.usuarios.find((us: User) => us.name === user.name)) {
        //SI NO ENCONTRAMOS UN USUARIO CON EL MISMO NOMBRE...
        // const max = this.authservice.usuarios.reduce((maxIndex, user, currentIndex) => {
        //   // RETORNAMOS EL ID MÁS ALTO (ESTO CON UN AUTOINCREMENT EN LA DB NO HACE FALTA PERO YO ESTOY USANDO UNA COSA RARA Xd)
        //   return user.id > this.authservice.usuarios[maxIndex].id ? currentIndex : maxIndex;
        // }, 0);

        // // LE ASIGANMOS LA ID EXTRAÍDA SUMANDO UNO PARA ASIGNARLE UN ID UNICO
        // user.id = this.authservice.usuarios[max].id + 1

        // SETEAMOS LA COOKIE
        this.authservice.setCookie(token)

        // POSTEAMOS EL USUARIO
        this.authservice.postUser(user).subscribe(() => {
          this.authservice.user.next(user)
          //AVISAMOS DE QUE SE HA CREADO EL USER
        })

      }
    }
  }
}
