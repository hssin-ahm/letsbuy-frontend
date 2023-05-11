import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from 'src/app/models/categorie';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  host = environment.apiBaseUrl ;


  constructor(private httpClient: HttpClient) { }
  
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  public getCategories(): Observable<Categorie[]>{
    
    return this.httpClient.get<Categorie[]>(`${this.host}/guest/categories`,{
      headers: this.requestHeader
    });
  }

  public getCategoriesByMotCle(mc: string): Observable<Categorie[]>{
    
    return this.httpClient.get<Categorie[]>(`${this.host}/guest/chercheCat/` + mc,{
      headers: this.requestHeader
    });
  }

  public getCategorie(id: number): Observable<Categorie>{
    return this.httpClient.get<Categorie>(this.host + "/guest/getCategorie/" + id);
  }

  public deleteCategorie(id: number): Observable<void>{
    return this.httpClient.delete<void>(this.host + "/admin/deleteCat/" + id)
  }
  public updateCategorie(c: Categorie): Observable<Categorie>{
    return this.httpClient.put<Categorie>(this.host + "/admin/editCat", c);
  }
  public addCategorie(p: Categorie): Observable<void>{
    return this.httpClient.post<void>(this.host + "/admin/addCat", p);
  }
}
