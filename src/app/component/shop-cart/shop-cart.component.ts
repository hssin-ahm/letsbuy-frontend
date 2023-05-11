import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Cart } from "src/app/models/Cart";
import { User } from "src/app/models/user";
import { CartService } from "src/app/services/cart/cart.service";
import { UserAuthService } from "src/app/services/user-auth/user-auth.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-shop-cart",
  templateUrl: "./shop-cart.component.html",
  styleUrls: ["./shop-cart.component.css"],
})
export class ShopCartComponent implements OnInit {
  carts: Cart[];
  msg = "";
  id;
  imgUrl = "http://localhost:8080/guest/getImage/";
  constructor(
    private userAuth: UserAuthService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.id = this.userAuth.getIdUser();
    this.getCartByUser();
  }
  getCartByUser() {
    this.cartService.getCartsByUser(this.id).subscribe((res) => {
      this.carts = res;
    });
  }

  getArrayOfNumber(value: number) {
    let res = [];
    for (let i = 1; i < value; i++) {
      res.push(i);
    }
    return res;
  }

  onChange(cart: Cart, value) {
    cart.quantity = +value;
  }

  onUpdate(cart: Cart) {
    this.cartService.updateCart(cart).subscribe(() => {
      this.msg = "Mise à jour réussie";
    });
  }

  onDelete(id: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        this.cartService.deleteCart(id).subscribe(() => {
          this.getCartByUser();
          this.msg = "Supprimé avec succès";
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // User cancelled, do nothing
      }
    });
  }
}
