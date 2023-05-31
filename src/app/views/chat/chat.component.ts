import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { create } from 'domain';
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
    this.authService.getUsers().subscribe(() => {
      this.users = this.authService.usuarios
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


      this.productService.getProducts().subscribe(() => {
        this.products = this.productService.productList
        this.chatService.getChats().subscribe(() => {
          this.chatList = this.chatService.chatList
          this.ownChats = this.chatList.filter((chat: Chat) => chat.emit === this.user.id || chat.recept === this.user.id);
          for (let x = 0; x < this.chatList.length; x++) {

            this.chatService.getMsg(this.chatList[x].id!).subscribe((message: Message[]) => {
              this.messages.push(message);
              if (x === this.chatList.length - 1) {
                this.loaded = true
              }
            })
          }

        })
      })
    })
  }

  public getuserChats() {
    this.chatService.getChats().subscribe(() => {
      this.chatList = this.chatService.chatList
      this.ownChats = this.chatList.filter((chat: Chat) => chat.emit === this.user.id || chat.recept === this.user.id);
    })
  }
  public getUserBuyersChats() {
    this.chatService.getChats().subscribe(() => {
      this.chatList = this.chatService.chatList
      this.ownChats = this.chatList.filter((chat: Chat) => chat.emit != this.user.id && chat.recept === this.user.id);
    })
  }
  getUserClosedChats() {
    this.chatService.getChats().subscribe(() => {
      this.chatList = this.chatService.chatList
      this.ownChats = this.chatList.filter((chat: Chat) => chat.closed);
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
      chatId: -1
    }
    if (created) {
      this.chatService.postMsg(message).subscribe(() => { })
    }

  }

}




