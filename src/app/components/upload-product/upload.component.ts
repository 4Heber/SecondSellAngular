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

    this.authService.getUsers().subscribe(() => {

      if (this.authService.getUserByCookie()) {
        this.authService.user.subscribe((us: User) => {
          this.user = us
          this.categoryService.getCategories().subscribe(() => {
            this.categories = this.categoryService.categoryList
            this.loaded = true
          })
        })
      }
      else {
        this.authService.user.subscribe((us: User) => {
          if (!(us.username)) {
            this.router.navigate(['/login']);
          }
          else {
            this.user = us
            this.categoryService.getCategories().subscribe(() => {
              this.categories = this.categoryService.categoryList
              this.loaded = true

            })

          }
        })

      }
    })
  }
  public sendProduct(): void {
    if (this.loaded == true && this.cansend) {
      const productName = <HTMLInputElement>document.getElementById("productName");
      const productDescription = <HTMLInputElement>document.getElementById("productDescription");
      const productPrice = <HTMLInputElement>document.getElementById("productPrice");
      const categorySelected = <HTMLInputElement>document.getElementById('form-auto')!
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
          photo: this.imageString,
          price: parseFloat(productPrice.value).toFixed(2),
          categoryId: categoryId.id,
          userId: this.user.id!,
          active: true

        };
        console.log(product)
        this.productService.postProduct(product).subscribe(() => {
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


