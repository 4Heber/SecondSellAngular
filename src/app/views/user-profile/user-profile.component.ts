import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { create } from 'domain';
import { retry } from 'rxjs';
import { Chat, Message } from 'src/app/models/chat.model';

import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { CountlogPipe } from 'src/app/pipes/countlog.pipe';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ChatService } from 'src/app/services/chat.service';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public products: Product[] = []
  public user: User = {} as User
  public selection = 1
  public counter: number[] = []
  public userId: number = -1
  public loaded = false
  public selectedUser: User = {} as User
  constructor(private countlogPipe: CountlogPipe, private chatService: ChatService, private router: Router, private route: ActivatedRoute, private productService: ProductService, private authService: AuthService, private categoryService: CategoryService) {

  }
  ngOnInit() {
    this.authService.getUsers().subscribe(() => {
      if (this.authService.getUserByCookie()) {
        this.authService.user.subscribe((us: User) => {
          this.user = us
        })
      }
      else {
        this.authService.user.subscribe((us: User) => {
          if (!(us.username)) {
            this.router.navigate(['/login']);
          }
          else {
            this.user = us
          }
        })
      }
      this.route.params.subscribe(params => {
        this.userId = params['id'];
        this.selection = 1
        if (this.userId != undefined && this.userId != null) {
          this.productService.getProductsByUserId(this.userId).subscribe((productList: Product[]) => {
            this.products = productList
            this.authService.getUser(this.userId).subscribe((us: User) => {
              this.selectedUser = us
              this.counter = this.countlogPipe.transform(this.products)
              this.loaded = true
            })
          })
        }
      })
    })
  }
  copiarUrl() {
    // Obtiene la URL actual
    const urlActual = window.location.href;

    // Crea un elemento de entrada de texto temporal
    const elementoTemporal = document.createElement('input');
    elementoTemporal.value = urlActual;

    // Agrega el elemento temporal al DOM
    document.body.appendChild(elementoTemporal);

    // Selecciona el texto del elemento temporal
    elementoTemporal.select();
    elementoTemporal.setSelectionRange(0, 99999); // Para dispositivos móviles

    // Copia el texto al portapapeles del sistema
    document.execCommand('copy');

    // Elimina el elemento temporal
    document.body.removeChild(elementoTemporal);

    // Alerta al usuario que se ha copiado la URL
    alert('¡URL copiada al portapapeles!');
  }
  public userRedirect(userId: number) {
    this.router.navigate([`/user/${userId}`])

  }
  public showSection(page: number) {
    this.selection = page
    if (page == 1) {
      document.getElementById("p-1")!.classList.add('selected')
      document.getElementById("p-2")!.classList.remove('selected')
      document.getElementById("p-3")!.classList.remove('selected')
      return
    }
    else if (page == 2) {
      document.getElementById("p-2")!.classList.add('selected')
      document.getElementById("p-1")!.classList.remove('selected')
      document.getElementById("p-3")!.classList.remove('selected')
      return
    }
    if (page == 3) {
      document.getElementById("p-3")!.classList.add('selected')
      document.getElementById("p-2")!.classList.remove('selected')
      document.getElementById("p-1")!.classList.remove('selected')
      return
    }
  }
}
