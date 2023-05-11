import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SystemCpu } from "src/app/models/system-cpu";
import { SystemHealth } from "src/app/models/system-health";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  private SERVER_URL = environment.apiBaseUrl + "/actuator";

  constructor(private http: HttpClient) {}
  public getnotfound(): Observable<any> {
    return this.http.get<any>(`${this.SERVER_URL}/actuator`);
  }
  public getHttpTraces(): Observable<any> {
    return this.http.get<any>(`${this.SERVER_URL}/httptrace`);
  }

  public getSystemHealth(): Observable<SystemHealth> {
    return this.http.get<SystemHealth>(`${this.SERVER_URL}/health`);
  }

  public getSystemCpu(): Observable<SystemCpu> {
    return this.http.get<SystemCpu>(
      `${this.SERVER_URL}/metrics/system.cpu.count`
    );
  }

  public getProcessUptime(): Observable<any> {
    return this.http.get<any>(`${this.SERVER_URL}/metrics/process.uptime`);
  }

  public sendMail(email): Observable<any> {
    return this.http.post<any>(
      `${environment.apiBaseUrl}/guest/sendMail/${email}`,
      {}
    );
  }
}
