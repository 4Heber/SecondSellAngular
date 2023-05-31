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
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  public product: Product = {} as Product
  public user: User = {} as User
  public seller: User = {} as User
  public products: Product[] = []
  public chatList: Chat[] = []
  public prodid!: string
  public canSend = true

  public toggleEditProfileModal(action: string){

    var editModal = document.getElementById('edit-profile-modal');
    var editBillAddress = document.getElementById('edit-bill-address-modal');
    var editShipAddress = document.getElementById('edit-ship-address-modal');

    if(action == 'show_profile_modal'){
      editModal!.style.display = "block";
      window.scrollTo(0,0);
    }
    else if(action == 'show_bill_modal'){
      editBillAddress!.style.display = "block";
      window.scrollTo(0,0);
    }
    else if(action == 'show_ship_modal'){
      editShipAddress!.style.display = "block";
      window.scrollTo(0,0);
    }
    else{
      editModal!.style.display = "none";
      editBillAddress!.style.display = "none";
      editShipAddress!.style.display = "none";
    }
  }

  constructor(private chatService: ChatService, private router: Router, private route: ActivatedRoute, private productService: ProductService, private authService: AuthService, private categoryService: CategoryService) {

  }

}