import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { OperadorCadastroComponent } from "../operador-cadastro/operador-cadastro.component";
import { Feathers } from "../services/feathers.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.css"]
})
export class ToolbarComponent implements OnInit {

  constructor(public dialog: MatDialog, private feathers: Feathers, private router: Router) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(OperadorCadastroComponent, { width: "800px" });
  }

  logOut() {
    this.feathers.logout().then(() => this.router.navigate(["/login"]));
  }

}
