import { Component, OnInit } from "@angular/core";
import { Form, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { UserAuthService } from "src/app/services/user-auth/user-auth.service";
import { UserService } from "src/app/services/user/user.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  msg: string = "";

  constructor(
    private userService: UserService,
    private userAuth: UserAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getReturnUrl();
  }

  getReturnUrl(): void {
    const userRoles: any = this.userAuth.getRoles();

    if (this.userAuth.isLoggedIn()) {
      if (userRoles[0].roleName === "Super_Admin") {
        this.router.navigate(["/admin"]);
      } else {
        this.router.navigate(["/home"]);
      }
    }
  }

  login(form: NgForm) {
    if (!form.valid) {
      this.msg = "uncorrect username or password";
      return;
    }
    this.userService.login(form.value).subscribe(
      (response: any) => {
        this.userAuth.setRoles(response.user.role);
        this.userAuth.setToken(response.jwtToken);
        this.userAuth.setIdUser(response.user.id);
        this.userAuth.setEmailUser(response.user.email);
        const role = response.user.role[0]["roleName"];
        if (role === "Admin") {
          this.router.navigate(["/admin"]);
        } else {
          this.router.navigate(["/home"]);
        }
        Swal.fire({
          position: "top-start",
          icon: "success",
          title: "successfully authenticated.",
          timer: 1500,
          showConfirmButton: false,
          backdrop: false,
          width: "25rem",
          padding: "1rem",
        });
      },
      (error) => {
        console.log(error);
        this.msg = "User not found";
      }
    );
  }
}
