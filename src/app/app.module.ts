import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { UploadComponent } from 'src/app/components/upload-product/upload.component';
import { LoginPageComponent } from 'src/app/views/login/login.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { PaginationPipeModule } from 'src/app/pipes/product-pipe.module';
import { HomeComponentModule } from 'src/app/views/home/home.module';
import { HomeComponent } from 'src/app/views/home/home.component';
import { UploadPage } from 'src/app/views/upload/upload.component';
import { TopPipeModule } from 'src/app/pipes/top-pipe.module';
import { ProductComponent } from 'src/app/views/product/product.component';
import { CategorySizePipeModule } from 'src/app/pipes/categorySize-pipe.module';
import { TimePipeModule } from 'src/app/pipes/time-pipe.module';
import { DescLenPipeeModule } from 'src/app/pipes/desc-pipe.module';
import { getUserPipeModule } from 'src/app/pipes/getuser-pipe.module';
import { CommonModule } from '@angular/common';
import { ChatComponent } from 'src/app/views/chat/chat.component';
import { getProductPipeModule } from 'src/app/pipes/getproduct-pipe.module';
import { SingleChatComponent } from './views/single-chat/single-chat.component';
import { SeenPipeModule } from 'src/app/pipes/seen-pipe.module';
import { SliderComponent } from 'src/app/components/slider/slider.component';
import { UserProfileComponent } from 'src/app/views/user-profile/user-profile.component';
import { OfferComponent } from 'src/app/components/offer/offer.component';
import { getByDatePipeModule } from 'src/app/pipes/message-history-pipe.module';
import { SliderFilterModule } from 'src/app/pipes/slider-pipe.module';
import { CartComponent } from 'src/app/views/cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountlogPipeModule } from 'src/app/pipes/countlog-pipe.module';
import { HeaderComponent } from 'src/app/components/header/header/header.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AutoComponent } from 'src/app/components/autocompleter/autocomplete.component';
import { HomeCategoryComponent } from 'src/app/views/home-category/home.component';
import { NotFoundComponent } from 'src/app/views/404/404.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginPageComponent,
    FooterComponent,
    UploadComponent,
    UploadPage,
    HomeComponent,
    ProductComponent,
    ChatComponent,
    SingleChatComponent,
    SliderComponent,
    UserProfileComponent,
    OfferComponent,
    CartComponent,
    HeaderComponent,
    AutoComponent,
    HomeCategoryComponent,
    NotFoundComponent




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PaginationPipeModule,
    TopPipeModule,
    CategorySizePipeModule,
    TimePipeModule,
    DescLenPipeeModule,
    getUserPipeModule,
    getProductPipeModule,
    SeenPipeModule,
    getByDatePipeModule,
    SliderFilterModule,
    CommonModule,
    FormsModule,
    CountlogPipeModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,







  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
