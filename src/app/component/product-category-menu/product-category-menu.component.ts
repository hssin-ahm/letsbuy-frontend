import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/models/categorie';
import { CategorieService } from 'src/app/services/categorie/categorie.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  categories: Categorie[];
  constructor(private catService: CategorieService) { }

  ngOnInit() {
    this.getCategories();
  }


  getCategories(): void {
    this.catService.getCategories().subscribe(
      res=>{
        console.log(res);
        this.categories = res;        
      }
    )
  }
}
