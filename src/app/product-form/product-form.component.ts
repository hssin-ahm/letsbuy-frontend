import { HttpErrorResponse, HttpEventType } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { Produit } from "src/app/models/produit";
import { ActivatedRoute, Router } from "@angular/router";
import { FileService } from "../services/file/file.service";
import { CategorieService } from "../services/categorie/categorie.service";
import { ProduitService } from "../services/guest/produit.service";
import { Categorie } from "../models/categorie";
import Swal from "sweetalert2";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"],
})
export class ProductFormComponent implements OnInit {
  id;
  imgUrl = "http://localhost:8080/guest/getImage/";
  title = "Ajouter";
  constructor(
    private fileService: FileService,
    private catService: CategorieService,
    private prodService: ProduitService,
    private router: Router,
    private ar: ActivatedRoute
  ) {}
  categories: Categorie[];
  produit: Produit;

  ngOnInit() {
    this.id = this.ar.snapshot.params["id"];
    if (this.id) {
      this.prodService.getProduct(this.id).subscribe(
        (res: any) => {
          this.filename = res.imgName;
          this.title = "Modifier";
          this.produit = res;
        },
        (err) => {
          Swal.fire("No data!", "No Data to display", "error");
        }
      );
    }
    this.getCategories();
  }

  getCategories(): void {
    this.catService.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }
  onUpdateproduit(prodForm: NgForm) {
    if (prodForm.value.id) {
      this.catService
        .getCategorie(prodForm.value.categorie)
        .subscribe((res) => {
          prodForm.value.categorie = res;
          this.editProduit(prodForm.value);
        });
    } else {
      this.catService
        .getCategorie(prodForm.value.categorie)
        .subscribe((res) => {
          prodForm.value.categorie = res;
          this.addProduit(prodForm.value);
        });
    }
  }

  editProduit(produit: Produit) {
    this.prodService.updateProduit(produit).subscribe(() => {
      this.router.navigate(["/admin/produits"]);
    });
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "successfully updated.",
      timer: 1500,
      showConfirmButton: false,
      backdrop: false,
      width: "25rem",
      padding: "1rem",
    });
  }

  addProduit(produit: Produit) {
    this.prodService.addProduit(produit).subscribe(() => {
      this.router.navigate(["/admin/produits"]);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "successfully added.",
        timer: 1500,
        showConfirmButton: false,
        backdrop: false,
        width: "25rem",
        padding: "1rem",
      });
    });
  }

  filename: string = "";

  onUploadFiles(files: File[]): void {
    const formData: FormData = new FormData();

    for (const file of files) {
      formData.append("files", file, file.name);
    }

    this.fileService.upload(formData).subscribe(
      (res) => {
        this.filename = res;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  openCategorieForm() {
    this.router.navigate(["/admin/categories"]);
  }
}
