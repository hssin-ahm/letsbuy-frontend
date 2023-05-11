import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "src/app/models/user";
import { UserAuthService } from "src/app/services/user-auth/user-auth.service";
import { UserService } from "src/app/services/user/user.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-inscrire",
  templateUrl: "./inscrire.component.html",
  styleUrls: ["./inscrire.component.css"],
})
export class InscrireComponent implements OnInit {
  msg: string = "";
  constructor(
    private userService: UserService,
    private userAuth: UserAuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  logup(loginForm: NgForm) {
    if (!loginForm.valid) {
      this.msg = "Fill out the fields correctly.";
      return;
    }
    const user: User = loginForm.value;
    this.userService.logup(user).subscribe(
      (response: any) => {
        this.router.navigate(["/login"]);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "registration successfully.",
          timer: 1500,
          showConfirmButton: false,
          backdrop: false,
          width: "25rem",
          padding: "1rem",
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
