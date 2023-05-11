import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/models/Cart';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  host = environment.apiBaseUrl + "/user" ;

  constructor(private httpClient: HttpClient) { }

  public getCartsByUser(id: number): Observable<Cart[]>{
    return this.httpClient.get<Cart[]>(`${this.host}/cart/getCartByUser/` + id) ;
  }

  public deleteCart(id: number): Observable<void>{
    return this.httpClient.delete<void>(`${this.host}/cart/delete/` + id) ;
  }
  public addCartsByUser(userId: number, prodId: number, cart: Cart): Observable<void>{
    return this.httpClient.post<void>(`${this.host}/cart/add/` + userId + "/" + prodId, cart) ;
  }
  public updateCart(cart: Cart): Observable<void>{
    return this.httpClient.put<void>(`${this.host}/cart/update`, cart) ;
  }
  public getNombreDeCartsByUser(idu: number): Observable<number>{
    return this.httpClient.get<number>(`${this.host}/cart/count/` + idu) ;
  }
}
