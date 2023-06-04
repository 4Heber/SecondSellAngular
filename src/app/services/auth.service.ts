import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { BehaviorSubject, map, Observable, retry } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // URL API
  private readonly CONFIG_URL = 'http://secondsell.randion.es/api';

  // ARRAY DE USUARIOS
  private users: User[] = []

  // USUARIO CON EL QUE TRABAJAREMOS EN TODAS LAS VISTAS
  public user: BehaviorSubject<User> = new BehaviorSubject({} as User)

  constructor(public http: HttpClient) {

  }

  get usuarios(): User[] {
    return this.users
  }

  public getUserByToken(token: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<User>(`${this.CONFIG_URL}/token/${token}`, { headers })
  }

  public getUserCookie(): string {
    const token = document.cookie
    const requ = "auth="
    let res = false
    let temp = ""
    for (let i = 0; i < token.length; i++) {
        if (i == requ.length -1) {
          res = true
        }
      else if (res == true) {
        temp += token[i]
      }
    }
    return temp
  }

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

  public getUsers(): Observable<void> {
    return this.http.get<User[]>(`${this.CONFIG_URL}/users`)
      .pipe(map(((users: User[]) => {
        this.users = users
      })))
  }

  public getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.CONFIG_URL}/users/${id}`)
  }

  public setCookie(token: string): void {
    document.cookie = `auth = ${token}; path = /`
  }

  public postUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.CONFIG_URL}/auth/signup`, user)
  }

  public loginUser(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.CONFIG_URL}/auth/login`, {
      username: username,
      password: password
    })
  }

  public loginUserByToken(token: string): Observable<User> {
    return this.http.post<User>(`${this.CONFIG_URL}/auth/login`, {
      token: token
    })
  }

  public putUser(user: User, index: number): void {
    this.http.put<User>(`${this.CONFIG_URL}/users/${index}`, user).subscribe(() => {

    })
  }


}
