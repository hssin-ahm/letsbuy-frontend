import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { AdminComponent } from "./component/admin/admin.component";
import { ForbiddenComponent } from "./component/forbidden/forbidden.component";
import { HomeComponent } from "./component/home/home.component";
import { InscrireComponent } from "./component/inscrire/inscrire.component";
import { ListCategoriesComponent } from "./component/list-categories/list-categories.component";
import { LoginComponent } from "./component/login/login.component";
import { ProduitDetailsComponent } from "./component/produit-details/produit-details.component";
import { ShopCartComponent } from "./component/shop-cart/shop-cart.component";
import { ProductFormComponent } from "./product-form/product-form.component";
import { DashboardComponent } from "./component/admin/dashboard/dashboard.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "home/:mc", component: HomeComponent },
  { path: "home/category/:idc", component: HomeComponent },
  {
    path: "cart",
    component: ShopCartComponent,
    canActivate: [AuthGuard],
    data: { roles: ["User"] },
  },
  { path: "forbidden", component: ForbiddenComponent },
  { path: "login", component: LoginComponent },
  { path: "inscrire", component: InscrireComponent },
  {
    path: "admin",
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Admin"] },
  },
  {
    path: "admin/produits",
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Admin"] },
  },
  {
    path: "admin/product",
    component: ProductFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Admin"] },
  },
  {
    path: "admin/categories",
    component: ListCategoriesComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Admin"] },
  },
  {
    path: "admin/product/:id",
    component: ProductFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Admin"] },
  },
  {
    path: "admin/dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Admin"] },
  },
  { path: "products/:id", component: ProduitDetailsComponent },
  {
    path: "admin/category/:idc",
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Admin"] },
  },
  { path: "**", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
