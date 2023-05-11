import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Categorie } from "src/app/models/categorie";
import { CartService } from "src/app/services/cart/cart.service";
import { CategorieService } from "src/app/services/categorie/categorie.service";
import { UserAuthService } from "src/app/services/user-auth/user-auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  @Input() numCart: number;
  categories: Categorie[];
  mc: string;
  idc;
  constructor(
    private catService: CategorieService,
    private router: Router,
    private userAuth: UserAuthService,
    private cartService: CartService,
    private ar: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCategories();
    if (this.userAuth.isLoggedIn()) {
      this.getNumberOftheCart();
    }
    this.ar.paramMap.subscribe((params: ParamMap) => {
      this.mc = params.get("mc");
      this.idc = params.get("idc");
    });
  }
  getNumberOftheCart() {
    this.cartService
      .getNombreDeCartsByUser(+this.userAuth.getIdUser())
      .subscribe((res) => {
        this.numCart = res;
      });
  }
  getCategories(): void {
    this.catService.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  doSearch(mc: string) {
    this.router.navigate(["/home/" + mc]);
  }

  openShopCart() {
    this.router.navigate(["/cart"]);
  }
}
