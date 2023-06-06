import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { create } from 'domain';
import { catchError, map, throwError } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Chat, Message } from 'src/app/models/chat.model';

import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ChatService } from 'src/app/services/chat.service';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public product: Product = {} as Product
  public user: User = {} as User
  public seller: User = {} as User
  public products: Product[] = []
  public chatList: Chat[] = []
  public canSend = true
  public pagination = 0
  public loaded = false
  public category: Category = {} as Category
  constructor(private chatService: ChatService, private router: Router, private route: ActivatedRoute, private productService: ProductService, private authService: AuthService, private categoryService: CategoryService) {

  }
  ngOnInit() {

    this.authService.getUserByToken(this.authService.getUserCookie()).pipe(
      catchError((error: { status: number; }) => {


        this.router.navigate(['login'])

        return throwError(error);
      })
    ).subscribe((res: User) => {
      this.user = res;
      this.authService.user.next(res);
      this.route.params.subscribe(params => {
        this.productService.getProductById(params['id']).pipe(
          catchError((error: { status: number }) => {
            this.router.navigate(['404']);
            return throwError(error);
          }),
          map((product: Product) => {
            if (product.seller_id) {
              this.categoryService.getCategories().subscribe(() => {
                product.photo = JSON.parse(product.photo!);
                this.product = product as Product;
                this.category = this.categoryService.categoryList.find((ele: Category) => ele.id === this.product.category_id)!
                this.productService.getProducts().subscribe(() => {
                  this.products = this.productService.productList.filter(element => element.category_id === product.category_id);
                  const imageP = <HTMLImageElement>document.getElementById("product-img")!
                  imageP.src = this.product.photo![this.pagination]
                  this.chatList = this.chatService.chatList
                  this.authService.getUser(product.seller_id).subscribe((us: User) => {
                    this.seller = us;
                    this.chatService.getUserChats(this.user.id!, this.authService.getUserCookie()).subscribe((res: any) => {
                      this.chatList = res
                      this.loaded = true
                    });
                  });
                })
              })
            } else {
              this.router.navigate(['404'])
            }
            return { product: this.product };
          })
        ).subscribe(() => {
        });
      });
    });
  }
  public ensureUser() {
    if (this.user.id
      == this.seller.id) {
      document.getElementById("error-chat")!.innerHTML = "Error sending the message"
      return false
    }
    else {
      document.getElementById("error-chat")!.innerHTML = "Message sent successfully"
      return true
    }
  }
  public showpannel() {
    document.getElementById("pannel")!.classList.remove("displayed")
  }
  public hidepannel() {
    document.getElementById("pannel")!.classList.add("displayed")

  }
  public showMessageDirect() {
    document.getElementById("chat")!.classList.remove("displayed")
  }
  public hideMessageDirect() {
    document.getElementById("chat")!.classList.add("displayed")
  }
  public isActive(index: number) {
    const eles = document.querySelectorAll('.active-pagination') as NodeListOf<HTMLElement>;
    eles.forEach(element => {
      element.classList.remove('active-pagination');
    });
    this.pagination = index
    document.getElementsByClassName(`known-pagination-${index}`)[0]!.classList.add('active-pagination')
    const imageP = <HTMLImageElement>document.getElementById("product-img")
    imageP.src = this.product.photo![this.pagination]

  }
  public async modifyPagination(amount: number) {

    let img = document.getElementById('p-img-d')!
    img.classList.add('trans-pag-d')
    img.style.transform = "translateX(0px)"
    let newPosition = this.pagination + amount;
    if (amount >= 1) {
      img.style.transform = "translateX(3000px)"
    }
    else {
      img.style.transform = "translateX(-3000px)"
    }
    await this.sleep(500);
    if (newPosition == -1) {
      img.classList.remove('trans-pag-d')
      if (amount >= 1) {
        img.style.transform = "translateX(-6000px)"
      }
      else {
        img.style.transform = "translateX(6000px)"
      }
      await this.sleep(15);
      img.classList.remove('trans-pag-d')
      img.classList.add('trans-pag-d')
      this.pagination = 2
      img.style.transform = "translateX(0px)"
      await this.sleep(500);
      img.classList.remove('trans-pag-d')
      img.style.transform = "translateX(0px)"
      return
    }
    const totalPages = 3
    if (newPosition > totalPages - 1) {
      img.classList.remove('trans-pag-d')
      if (amount >= 1) {
        img.style.transform = "translateX(-6000px)"
      }
      else {
        img.style.transform = "translateX(6000px)"
      }
      await this.sleep(15);
      img.classList.remove('trans-pag-d')
      img.classList.add('trans-pag-d')
      this.pagination = 0
      img.style.transform = "translateX(0px)"
      await this.sleep(500);
      img.classList.remove('trans-pag-d')
      img.style.transform = "translateX(0px)"
      return
    }
    img.classList.remove('trans-pag-d')
    img.style.transform = "translateX(0px)"

    if (amount >= 1) {
      img.style.transform = "translateX(-6000px)"
    }
    else {
      img.style.transform = "translateX(6000px)"
    }
    await this.sleep(20);
    img.classList.remove('trans-pag-d')
    img.classList.add('trans-pag-d')
    this.pagination = newPosition
    img.style.transform = "translateX(0px)"
    await this.sleep(500);
    img.classList.remove('trans-pag-d')
    img.style.transform = "translateX(0px)"
    return

  }
  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  public sendMessage() {
    if (!this.ensureUser()) {
      this.hideMessageDirect()
      this.showpannel()
      return
    }
    const chat = this.chatList.find(
      (chat) => chat.emit === this.user.id && chat.recept === this.seller.id && chat.product_id === this.product.id
    );
    const messageInput = document.getElementById("chat-msg") as HTMLTextAreaElement | null;
    const created = Boolean(chat);


    if (this.canSend && this.product.active) {
      if (created) {
        let message: Message = {
          emit: this.user!.id!,
          message: messageInput!.value,
          seen: false,
          created_at: new Date(),
          chat_id: chat!.id!,
        }
        if (this.ensureUser()) {
          this.canSend = false
          this.chatService.postMsg(message, this.user.id!, this.authService.getUserCookie()).subscribe(() => {
            this.hideMessageDirect()
            this.showpannel()
            this.chatService.getUserChats(this.user.id!, this.authService.getUserCookie()).subscribe((res: any) => {
              this.chatList = res
              this.canSend = true
            })
          })
        }
        this.hideMessageDirect()
        this.showpannel()
      }
      else {

        this.canSend = false

        let chat: Chat = {
          closed: false,
          emit: this.user!.id!,
          recept: this.seller!.id!,
          product_id: this.product.id!,
        }
        this.chatService.postChat(chat, this.user.id!, this.authService.getUserCookie()).subscribe((res: any) => {
          this.chatService.getUserChats(this.user.id!, this.authService.getUserCookie()).subscribe((res: any) => {

            this.chatList = res
            this.canSend = true
            const chat = this.chatList.find(
              (chat) => chat.emit === this.user.id && chat.recept === this.seller.id && chat.product_id === this.product.id
            );
            let message: Message = {
              emit: this.user!.id!,
              message: messageInput!.value,
              seen: false,
              created_at: new Date(),
              chat_id: chat!.id!,
            }
            this.chatService.postMsg(message, this.user.id!, this.authService.getUserCookie()).subscribe(() => {
              this.canSend = true
            })
          })
          this.hideMessageDirect()
          this.showpannel()
        })


      }
    }
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
}
