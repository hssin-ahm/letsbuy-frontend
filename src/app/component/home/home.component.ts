import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Produit } from "src/app/models/produit";
import { CartService } from "src/app/services/cart/cart.service";
import { ProduitService } from "src/app/services/guest/produit.service";
import { UserAuthService } from "src/app/services/user-auth/user-auth.service";
import { Cart } from "src/app/models/Cart";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  idc;
  mc: string;
  products: Produit[];
  cart: Cart;
  thePageNumber = 1;
  thePageSize = 4;
  totalItems;

  theTotalElements;

  imgUrl = "http://localhost:8080/guest/getImage/";
  numCart: number;
  msg: string = "";
  constructor(
    private produitService: ProduitService,
    private ar: ActivatedRoute,
    private cartService: CartService,
    private userAuth: UserAuthService
  ) {}

  ngOnInit() {
    this.ar.paramMap.subscribe((params: ParamMap) => {
      this.mc = params.get("mc");
      this.idc = +params.get("idc");

      if (this.idc != 0) {
        this.filterByCategorys();
      }

      if (this.mc !== null) {
        this.searchProduits(this.mc);
      }
    });
    if (this.mc == undefined && this.idc == 0) {
      this.getProduits();
    }
  }

  getProduits() {
    // this.produitService.getProducts().subscribe((res) => {
    //   this.products = res;
    // });
    this.produitService
      .getPaginatedProducts(this.thePageNumber, this.thePageSize)
      .subscribe((res: any) => {
        this.products = res.content;
        console.log(this.products);

        this.totalItems = res.totalElements;
      });
  }
  changePage(page) {
    this.thePageNumber = page;
    this.produitService
      .getPaginatedProducts(page, this.thePageSize)
      .subscribe((res: any) => {
        this.products = res.content;
      });
  }
  searchProduits(mc: string) {
    if (mc == "") {
      this.getProduits();
    } else {
      this.produitService.getProduitBymotCle(mc).subscribe((res) => {
        this.products = res;
      });
    }
  }

  filterByCategorys() {
    this.produitService.getProduitByCategorie(this.idc).subscribe((res) => {
      this.products = res;
    });
  }
  addToCart(prodId: number) {
    this.cartService
      .addCartsByUser(+this.userAuth.getIdUser(), prodId, this.cart)
      .subscribe(() => {
        this.getNumberOftheCart();
        this.msg = "Ajout réussi";
      });
  }

  getNumberOftheCart() {
    this.cartService
      .getNombreDeCartsByUser(+this.userAuth.getIdUser())
      .subscribe((res) => {
        this.numCart = res;
      });
  }
}
