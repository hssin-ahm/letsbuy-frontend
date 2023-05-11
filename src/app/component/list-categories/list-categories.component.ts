import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Categorie } from "src/app/models/categorie";
import { CategorieService } from "src/app/services/categorie/categorie.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list-categories",
  templateUrl: "./list-categories.component.html",
  styleUrls: ["./list-categories.component.css"],
})
export class ListCategoriesComponent implements OnInit {
  categories: Categorie[];
  categorie: Categorie;
  constructor(private categorieService: CategorieService) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.categorieService.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  public onOpenModal(idc?: number): void {
    if (idc) {
      this.categorieService.getCategorie(idc).subscribe((res) => {
        this.categorie = res;
      });
    }
    const container = document.getElementById("main-container");
    const button = document.createElement("button");
    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-toggle", "modal");

    button.setAttribute("data-target", "#updateCategorieModal");

    container.appendChild(button);
    button.click();
  }

  onUpdateCat(catForm: NgForm) {
    if (catForm.value.id) {
      this.categorieService.updateCategorie(catForm.value).subscribe(() => {
        this.getCategories();
        catForm.reset();
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
      });
    } else {
      this.categorieService.addCategorie(catForm.value).subscribe(() => {
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
        this.getCategories();
        catForm.reset();
      });
    }
  }

  onDelete(cat: Categorie) {
    this.categorieService.deleteCategorie(cat.id).subscribe(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "successfully deleted.",
        timer: 1500,
        showConfirmButton: false,
        backdrop: false,
        width: "25rem",
        padding: "1rem",
      });
      this.getCategories();
    });
  }

  searchcategories(mc: string) {
    if (mc == "") {
      this.getCategories();
    } else {
      this.categorieService.getCategoriesByMotCle(mc).subscribe((res) => {
        this.categories = res;
      });
    }
  }
}
