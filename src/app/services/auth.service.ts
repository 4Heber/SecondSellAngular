import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { BehaviorSubject, map, Observable, retry } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // URL API
  private readonly CONFIG_URL = 'http://localhost:3000';

  // ARRAY DE USUARIOS
  private users: User[] = []

  // USUARIO CON EL QUE TRABAJAREMOS EN TODAS LAS VISTAS
  public user: BehaviorSubject<User> = new BehaviorSubject({} as User)

  constructor(public http: HttpClient) {

  }

  // GETTER DE ARRAY DE USUARIOS
  get usuarios(): User[] {
    return this.users
  }

  // FUNCION PARA GENERAR UNA COOKIE NUEVA
  public getCookie(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const length = 10
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;

  }

  // FUNCION PARA EXTRAER EL VALOR DE UNA COOKIE
  public getUserCookie(): String {
    const token = document.cookie
    const requ = "auth="
    let res = false
    let temp = ""

    for (let i = 0; i < token.length; i++) {
      if (token[i] == ";" && res == true) {

        return temp
      }
      if (token[i] == requ[0]) {
        let count = 0
        for (let x = 0; x < requ.length; x++) {
          if (requ[x] == token[i + x]) {
            count++
          }
        }
        if (count == requ.length) {
          res = true
          i += requ.length - 1
        }
      }
      else if (res == true) {
        temp += token[i]
      }
    }
    return temp
  }

  // FUNCION PARA EXTRAER UN USUARIO POR SU COOKIE
  public getUserByCookie(): boolean {

    let tempUser = this.users.find((us: User) => {
      return us.token! == this.getUserCookie();
    });
    if (tempUser) {
      this.user.next(tempUser!)
      return true
    }
    return false
  }

  // FUNCIÓN PARA OBTENER LOS USUARIOS Y ALMACENARLOS EN LA VAR PRIVADA
  public getUsers(): Observable<void> {
    return this.http.get<User[]>(`${this.CONFIG_URL}/users`)
      .pipe(map(((users: User[]) => {
        this.users = users
      })))
  }

  public getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.CONFIG_URL}/users/${id}`)
  }

  // FUNCIÓN PARA SETTEAR UNA COOKIE A UN USER
  public setCookie(token: string): void {
    document.cookie = `auth = ${token}; path = /`
  }

  // FUNCIÓN PARA HACER POST DE UN USUARIO
  public postUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.CONFIG_URL}/users`, user)
  }

  // FUNCIÓN PARA HACER UN PUT DE UN USUARIO
  public putUser(user: User, index: number): void {
    this.http.put<User>(`${this.CONFIG_URL}/users/${index}`, user).subscribe(() => {

    })
  }


}
