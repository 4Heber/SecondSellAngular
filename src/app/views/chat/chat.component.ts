import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { create } from 'domain';
import { catchError, throwError } from 'rxjs';
import { Chat, Message } from 'src/app/models/chat.model';

import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ChatService } from 'src/app/services/chat.service';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public product: Product = {} as Product
  public user: User = {} as User
  public users: User[] = []
  public seller: User = {} as User
  public products: Product[] = []
  public chatList: Chat[] = []
  public ownChats: Chat[] = []
  public loaded = false
  public messages: Message[][] = []
  constructor(private chatService: ChatService, private router: Router, private route: ActivatedRoute, private productService: ProductService, private authService: AuthService, private categoryService: CategoryService) {

  }
  ngOnInit() {
    this.authService.getUserByToken(this.authService.getUserCookie()).pipe(
      catchError((error: { status: number; }) => {
        if (error.status === 401) {
          this.router.navigate(['login'])
        }
        return throwError(error);
      })
    ).subscribe((res: User) => {

      this.authService.getUsers().subscribe(() => {
        this.users = this.authService.usuarios

        this.user = res
        this.productService.getProducts().subscribe(() => {
          this.products = this.productService.productList
          this.chatService.getUserChats(this.user.id!, this.authService.getUserCookie()).subscribe((res: Chat[]) => {
            this.chatList = res
            this.ownChats = res
            for (let x = 0; x < this.chatList.length; x++) {
              this.chatService.getMsg(this.chatList[x].id!, this.user.id!, this.authService.getUserCookie()).subscribe((res: any) => {
                this.messages.push(res);
                if (x === this.chatList.length - 1) {
                  this.loaded = true
                  console.log(res)
                }
              })
            }
          })
        })
      })
    })
  }

  public getuserChats() {
    this.chatService.getUserChats(this.user.id!, this.authService.getUserCookie()).subscribe((res: Chat[]) => {
      this.chatList = res
      this.ownChats = res
    })
  }
  public getUserBuyersChats() {
    this.chatService.getUserChats(this.user.id!, this.authService.getUserCookie()).subscribe((res: Chat[]) => {
      this.chatList = res
      this.ownChats = res.filter((chat: Chat) => chat.emit != this.user.id && chat.recept === this.user.id);
    })
  }
  getUserClosedChats() {
    this.chatService.getUserChats(this.user.id!, this.authService.getUserCookie()).subscribe((res: Chat[]) => {
      this.chatList = res
      this.ownChats = res.filter((chat: Chat) => chat.closed);
    })
  }
  public messageRedirect(msgId: number) {
    const proute = `/chat/${msgId}`
    this.router.navigate([proute])
  }
  public sendMessage() {
    const chat = this.chatList.find(
      (chat) => chat.emit === this.user.id && chat.recept === this.seller.id
    );
    const messageInput = document.getElementById("chat-msg") as HTMLTextAreaElement | null;

    const created = Boolean(chat);
    let message: Message = {
      emit: this.user!.id!,
      message: messageInput!.value,
      seen: false,
      created_at: new Date(),
      chat_id: -1
    }
    if (created) {
      this.chatService.postMsg(message, this.user.id!, this.authService.getUserCookie()).subscribe(() => { })
    }

  }

}




