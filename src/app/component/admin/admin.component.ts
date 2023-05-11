import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Produit } from "src/app/models/produit";
import { ProduitService } from "src/app/services/guest/produit.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  idc;
  imgUrl = "http://localhost:8080/guest/getImage/";

  produits: Produit[] = [];
  constructor(
    private produitService: ProduitService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idc = +params.get("idc");

      if (this.idc != 0) {
        this.produitService.getProduitByCategorie(this.idc).subscribe((res) => {
          this.produits = res;
        });
      }
    });
    if (this.idc) {
      this.produitService.getProduitByCategorie(this.idc).subscribe((res) => {
        this.produits = res;
      });
    } else {
      this.getProducts();
    }
  }

  getProducts(): void {
    this.produitService.getProducts().subscribe((res) => {
      this.produits = res;
    });
  }

  openForm(id?: number) {
    if (id) {
      this.router.navigate(["/admin/product/" + id]);
    } else {
      this.router.navigate(["/admin/product"]);
    }
  }

  onDelete(produit: Produit) {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        this.produitService.deleteProduit(produit.id).subscribe(() => {
          this.getProducts();
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // User cancelled, do nothing
      }
    });
  }

  searchProduits(mc: string) {
    if (mc == "") {
      this.getProducts();
    } else {
      this.produitService.getProduitBymotCle(mc).subscribe((res) => {
        this.produits = res;
      });
    }
  }
  openCategorieForm() {
    this.router.navigate(["/admin/categories"]);
  }
}
