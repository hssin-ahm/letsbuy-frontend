import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./component/home/home.component";
import { AdminComponent } from "./component/admin/admin.component";
import { LoginComponent } from "./component/login/login.component";
import { HeaderComponent } from "./component/header/header.component";
import { ForbiddenComponent } from "./component/forbidden/forbidden.component";
import { ProductCategoryMenuComponent } from "./component/product-category-menu/product-category-menu.component";
import { LoginStatusComponent } from "./component/login-status/login-status.component";
import { FormsModule } from "@angular/forms";
import { InscrireComponent } from "./component/inscrire/inscrire.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { AuthInterceptor } from "./auth/auth.interceptor";
import { UserService } from "./services/user/user.service";
import { ProductFormComponent } from "./product-form/product-form.component";
import { ListCategoriesComponent } from "./component/list-categories/list-categories.component";
import { ProduitDetailsComponent } from "./component/produit-details/produit-details.component";
import { ShopCartComponent } from "./component/shop-cart/shop-cart.component";
import { DashboardComponent } from "./component/admin/dashboard/dashboard.component";
import { ChartsModule } from "ng2-charts";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    ProductCategoryMenuComponent,
    LoginStatusComponent,
    InscrireComponent,
    ProductFormComponent,
    ListCategoriesComponent,
    ProduitDetailsComponent,
    ShopCartComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ChartsModule,
    NgxPaginationModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
