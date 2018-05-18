import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ClienteCadastroComponent } from "../cliente-cadastro/cliente-cadastro.component";
import { Observable } from "rxjs/Observable";
import { DataService } from "../services/data.service";
import { YesNoComponent } from "../yes-no/yes-no.component";
import { Client } from "../models/Client";
import { DialogService } from "../services/dialog.service";
import { Operator } from "../models/Operator";

@Component({
  selector: "app-clientes",
  templateUrl: "./clientes.component.html",
  styleUrls: ["./clientes.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientesComponent extends DialogService implements OnInit {

  items$: Observable<Client[]>;
  queryString = "";

  constructor(public dialog: MatDialog, data: DataService) {
    super(dialog, ClienteCadastroComponent, data.clients);
    this.items$ = super.find(data.clients);
  }

  newItem(): void {
    const item = new Client(undefined, "", "", null, true);
    this.editItem(item);
  }

  ngOnInit() {
  }

}
