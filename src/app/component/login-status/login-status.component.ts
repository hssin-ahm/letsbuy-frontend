import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserAuthService } from "src/app/services/user-auth/user-auth.service";

@Component({
  selector: "app-login-status",
  templateUrl: "./login-status.component.html",
  styleUrls: ["./login-status.component.css"],
})
export class LoginStatusComponent implements OnInit {
  userName;
  constructor(private userAth: UserAuthService, private router: Router) {}

  ngOnInit() {
    if (this.userAth.isLoggedIn()) {
      this.userName = localStorage.getItem("name");
    }
  }

  isloggeedIn() {
    return this.userAth.isLoggedIn();
  }
  logout() {
    this.userAth.clear();
    this.router.navigate(["/login"]);
  }
}
