import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-upload-component',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  private user: User = {} as User
  // BOOLEANO PARA IDENTIFICAR LA CARGA DE USUARIOS
  public imageString: string[] = ['none', 'none', 'none']
  public selectedState: string = ''
  public categoryControl = new FormControl();
  public categories: any[] = ['sd']
  private cansend = true
  private loaded = false
  // EN EL CONSTRUCTOR INICIALIZAMOS EL SERVICIO QUE CONTIENE LOS DATOS / FUNCIONES
  constructor(
    private readonly authService: AuthService,
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private router: Router
  ) { }

  // AL CREAR EL COMPONENTE NOS SUSCRIBIMOS AL OBSERVABLE QUE RETORNA LA FUNCION GETUSERS
  ngOnInit(): void {

  this.authService.getUserByToken(this.authService.getUserCookie()).subscribe((us:User)=> {
    if(us) {
      this.user = us
      this.authService.user.next(us)
      this.categoryService.getCategories().subscribe(()=> {
        this.categories =  this.categoryService.categoryList
        this.loaded = true
        this.cansend = true
      })
    }
    else {
      this.router.navigate(['login'])
    }
  })
  }
  public sendProduct(): void {
    if (this.loaded == true && this.cansend) {
      const productName = <HTMLInputElement>document.getElementById("productName");
      const productDescription = <HTMLInputElement>document.getElementById("productDescription");
      const productPrice = <HTMLInputElement>document.getElementById("productPrice");
      const categorySelected = <HTMLInputElement>document.getElementById('form-auto')!
      alert(productPrice.value)
      const categoryId = this.categories.find((categoria) => categoria.name.toLowerCase() === categorySelected.value.toLowerCase());
      if (categoryId && productName.value != "" && this.selectedState != "" && productDescription.value != "" && productPrice.value != "") {
        this.cansend = false
        const now = new Date();
        const product: Product = {
          created_at: now,
          updated_at: now,
          name: productName.value,
          description: productDescription.value,
          state: this.selectedState,
          photo:JSON.stringify(this.imageString),
          price: parseFloat(productPrice.value),
          category_id: categoryId.id,
          seller_id: this.user.id!,
          buyer_id:null,
          active: true

        };
        console.log(product)
        this.productService.postProduct(product,this.authService.getUserCookie()).subscribe(() => {
          this.cansend = true
          this.router.navigate([`/products/${product.id!}`])
        })


      }
    }
  }
  public updatePhoto(event: Event, index: number): void {
    const file = (event.target as HTMLInputElement)!.files![0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const photoContainers = document.getElementsByClassName("photo-container");
      const currentContainer = photoContainers[index];
      this.imageString[index] = reader.result as string;

    };
  }
}


