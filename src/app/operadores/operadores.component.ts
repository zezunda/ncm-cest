import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { MatDialog } from "@angular/material";
import { OperadorCadastroComponent } from "../operador-cadastro/operador-cadastro.component";
import { Observable } from "rxjs/Observable";
import { Operator } from "../models/Operator";
import { DataService } from "../services/data.service";
import { DialogService } from "../services/dialog.service";
import { Client } from "../models/Client";

@Component({
  selector: "app-operadores",
  templateUrl: "./operadores.component.html",
  styleUrls: ["./operadores.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OperadoresComponent extends DialogService implements OnInit {

  items$: Observable<Operator[]>;
  queryString = "";

  constructor(public dialog: MatDialog, data: DataService) {
    super(dialog, OperadorCadastroComponent, data.operators);
    this.items$ = super.find(data.operators);
  }

  newItem(): void {
    const item = new Operator(undefined, "", "", "", 0, undefined, "Cliente", true, undefined);
    this.editItem(item);
  }

  ngOnInit() {
  }

}
