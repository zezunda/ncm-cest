import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Feathers } from "../services/feathers.service";
import { FormControl, Validators, FormGroup, FormBuilder } from "@angular/forms";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {

  public form: FormGroup;
  hide: boolean;

  constructor(private _feathers: Feathers, private fb: FormBuilder, private router: Router, public snackBar: MatSnackBar) {
    this.form = this.fb.group({
      "email": ["", Validators.compose([Validators.required, Validators.email])],
      "password": ["", Validators.compose([Validators.required, Validators.minLength(3)])]
    });
  }

  email = new FormControl("", [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError("required") ? "Entre com um e-mail válido." :
      this.email.hasError("email") ? "Email inválido." :
        "";
  }

  login() {
    const email = this.form.controls["email"].value;
    const password = this.form.controls["password"].value;
    this._login(email, password);
  }

  keyDown(event) {
    if (event["keyCode"] == 13 && this.form.valid) {
      this.login();
    }
  }

  _login(email: string, password: string) {
    this._feathers.authenticate({
      strategy: "local",
      email,
      password
    })
      .then((data) => {
        this.router.navigate(["/"]);
      })
      .catch(err => {
        this.snackBar.open("Erro na autenticação.", "Fechar", {
          duration: 2000,
        });
      });
  }
}
