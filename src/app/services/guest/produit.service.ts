import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Produit } from "src/app/models/produit";
@Injectable({
  providedIn: "root",
})
export class ProduitService {
  host = environment.apiBaseUrl;

  requestHeader = new HttpHeaders({ "No-Auth": "True" });

  constructor(private httpClient: HttpClient) {}

  public getProducts(): Observable<Produit[]> {
    return this.httpClient.get<Produit[]>(`${this.host}/guest/products`, {
      headers: this.requestHeader,
    });
  }
  public getPaginatedProducts(numpage, size): Observable<Produit[]> {
    return this.httpClient.get<Produit[]>(
      `${this.host}/guest/products/${numpage}/${size}`,
      {
        headers: this.requestHeader,
      }
    );
  }
  public getProduitByCategorie(id: number): Observable<Produit[]> {
    return this.httpClient.get<Produit[]>(
      `${this.host}/guest/geProduitByCategorie/` + id,
      {
        headers: this.requestHeader,
      }
    );
  }

  public getProduitBymotCle(mc: string): Observable<Produit[]> {
    return this.httpClient.get<Produit[]>(`${this.host}/guest/cherche/` + mc, {
      headers: this.requestHeader,
    });
  }

  public getProduct(id: number): Observable<Produit> {
    return this.httpClient.get<Produit>(this.host + "/guest/getProduit/" + id, {
      headers: this.requestHeader,
    });
  }

  public deleteProduit(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.host + "/admin/delete/" + id);
  }

  public updateProduit(p: Produit): Observable<void> {
    return this.httpClient.post<void>(this.host + "/admin/add", p);
  }
  public addProduit(p: Produit): Observable<void> {
    return this.httpClient.post<void>(this.host + "/admin/add", p);
  }
}
