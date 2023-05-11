import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { SystemCpu } from "src/app/models/system-cpu";
import { SystemHealth } from "src/app/models/system-health";
import { DashboardService } from "src/app/services/dashboard/dashboard.service";
import * as Chart from "chart.js";
import { ChartType } from "src/app/enum/chart-type.enum";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  public traceList: any[] = [];
  public selectedTrace: any;
  public systemHealth: any;
  public systemCpu: SystemCpu;
  public processUpTime: string;
  public http200Traces: any[] = [];
  public http400Traces: any[] = [];
  public http404Traces: any[] = [];
  public http500Traces: any[] = [];
  public httpDefaultTraces: any[] = [];
  private timestamp: number;
  public pageSize = 10;
  public page = 1;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.getTraces();
    this.getCpuUsage();
    this.getSystemHealth();
    this.getProcessUpTime(true);
  }

  private getTraces() {
    this.dashboardService.getHttpTraces().subscribe(
      (response: any) => {
        this.processTraces(response.traces);
        this.initializeBarChart();
        this.initializePieChart();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  private processTraces(traces: any) {
    //this.traceList = traces;
    this.traceList = traces.filter((trace) => {
      return !trace.request.uri.includes("actuator");
    });
    this.traceList.forEach((trace) => {
      switch (trace.response.status) {
        case 200:
          this.http200Traces.push(trace);
          break;
        case 400:
          this.http400Traces.push(trace);
          break;
        case 404:
          this.http404Traces.push(trace);
          break;
        case 500:
          this.http500Traces.push(trace);
          break;
        default:
          this.httpDefaultTraces.push(trace);
      }
    });
  }
  private getCpuUsage() {
    this.dashboardService.getSystemCpu().subscribe((response: SystemCpu) => {
      this.systemCpu = response;
      console.log(response);
    });
  }

  private getSystemHealth() {
    this.dashboardService.getSystemHealth().subscribe(
      (response: any) => {
        this.systemHealth = response;

        console.log(response);

        this.systemHealth.components.diskSpace.details.free = this.formatBytes(
          this.systemHealth.components.diskSpace.details.free
        );
      },
      (error: HttpErrorResponse) => {
        this.systemHealth = error.error;
        this.systemHealth.components.diskSpace.details.free = this.formatBytes(
          this.systemHealth.components.diskSpace.details.free
        );
        console.log(error);
      }
    );
  }
  private getProcessUpTime(isUpdateTime: boolean) {
    this.dashboardService.getProcessUptime().subscribe(
      (response: any) => {
        console.log(response.measurements[0].value);

        this.timestamp = Math.round(response.measurements[0].value);
        this.processUpTime = this.formateUptime(this.timestamp);
        if (isUpdateTime) {
          this.updateTime();
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }
  private updateTime(): void {
    setInterval(() => {
      this.processUpTime = this.formateUptime(this.timestamp + 1);
      this.timestamp++;
    }, 1000);
  }

  public onRefreshData(): void {
    this.http200Traces = [];
    this.http400Traces = [];
    this.http404Traces = [];
    this.http500Traces = [];
    this.getTraces();
    this.getSystemHealth();
    this.getCpuUsage();
    this.getProcessUpTime(false);
  }

  private formatBytes(bytes): string {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = 2 < 0 ? 0 : 2;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  public onSelectTrace(trace: any): void {
    this.selectedTrace = trace;
    document.getElementById("trace-modal").click();
  }

  private formateUptime(timestamp: number): string {
    const hours = Math.floor(timestamp / 60 / 60);
    const minutes = Math.floor(timestamp / 60) - hours * 60;
    const seconds = timestamp % 60;
    return (
      hours.toString().padStart(2, "0") +
      "h" +
      minutes.toString().padStart(2, "0") +
      "m" +
      seconds.toString().padStart(2, "0") +
      "s"
    );
  }

  private initializeBarChart(): Chart {
    const element: any = document.getElementById("barChart");
    return new Chart(element, {
      type: ChartType.BAR,
      data: {
        labels: ["200", "404", "400", "500"],
        datasets: [
          {
            data: [
              this.http200Traces.length,
              this.http404Traces.length,
              this.http400Traces.length,
              this.http500Traces.length,
            ],
            backgroundColor: [
              "rgb(40,167,69)",
              "rgb(0,123,255)",
              "rgb(253,126,20)",
              "rgb(220,53,69)",
            ],
            borderColor: [
              "rgb(40,167,69)",
              "rgb(0,123,255)",
              "rgb(253,126,20)",
              "rgb(220,53,69)",
            ],
            borderWidth: 3,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: [`Last 100 Requests as of ${this.formatDate(new Date())}`],
        },
        legend: { display: false },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }
  private initializePieChart(): Chart {
    const element: any = document.getElementById("pieChart");
    return new Chart(element, {
      type: ChartType.PIE,
      data: {
        labels: ["200", "404", "400", "500"],
        datasets: [
          {
            data: [
              this.http200Traces.length,
              this.http404Traces.length,
              this.http400Traces.length,
              this.http500Traces.length,
            ],
            backgroundColor: [
              "rgb(40,167,69)",
              "rgb(0,123,255)",
              "rgb(253,126,20)",
              "rgb(220,53,69)",
            ],
            borderColor: [
              "rgb(40,167,69)",
              "rgb(0,123,255)",
              "rgb(253,126,20)",
              "rgb(220,53,69)",
            ],
            borderWidth: 3,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: [`Last 100 Requests as of ${this.formatDate(new Date())}`],
        },
        legend: { display: true },
      },
    });
  }
  private formatDate(date: Date): string {
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const year = date.getFullYear();
    let day = `${dd}`;
    let month = `${mm}`;
    if (dd < 10) {
      day = `0${dd}`;
    }
    if (mm < 10) {
      month = `0${mm}`;
    }
    return `${day}/${month}/${year}`;
  }
  public exportTableToExcel(): void {
    const downloadLink = document.createElement("a");
    const dataType = "application/vnd.ms-excel";
    const table = document.getElementById("httptrace-table");
    const tableHTML = table.outerHTML.replace(/ /g, "%20");
    const filename = "httptrace.xls";
    document.body.appendChild(downloadLink);
    downloadLink.href = "data:" + dataType + ", " + tableHTML;
    downloadLink.download = filename;
    downloadLink.click();
  }
}
