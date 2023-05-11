import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  
  server = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  upload(formData: FormData): Observable<string>{
    return this.httpClient.post<string>(`${this.server}/admin/upload`, formData)
  }

}
