import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Cart } from "src/app/models/Cart";
import { Produit } from "src/app/models/produit";
import { CartService } from "src/app/services/cart/cart.service";
import { ProduitService } from "src/app/services/guest/produit.service";
import { UserAuthService } from "src/app/services/user-auth/user-auth.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-produit-details",
  templateUrl: "./produit-details.component.html",
  styleUrls: ["./produit-details.component.css"],
})
export class ProduitDetailsComponent implements OnInit {
  product: Produit;
  id;
  cart: Cart;
  msg = "";
  imgUrl = "http://localhost:8080/guest/getImage/";
  numCart: number;
  constructor(
    private produitService: ProduitService,
    private ar: ActivatedRoute,
    private cartService: CartService,
    private userAuth: UserAuthService
  ) {}

  ngOnInit() {
    this.id = this.ar.snapshot.params["id"];
    this.produitService.getProduct(this.id).subscribe(
      (res) => {
        this.product = res;
      },
      (err) => {
        Swal.fire("No data!", "No Data to display", "error");
      }
    );
  }
  addToCart() {
    this.cartService
      .addCartsByUser(+this.userAuth.getIdUser(), this.id, this.cart)
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
