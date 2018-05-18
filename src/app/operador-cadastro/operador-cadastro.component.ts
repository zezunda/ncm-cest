import { Component, OnInit, Inject } from "@angular/core";
import { FormControl, Validators, FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { DataService } from "../services/data.service";
import { Observable } from "rxjs/Observable";
import { Client } from "../models/Client";

@Component({
  selector: "app-operador-cadastro",
  templateUrl: "./operador-cadastro.component.html",
  styleUrls: ["./operador-cadastro.component.css"]
})
export class OperadorCadastroComponent implements OnInit {

  public form: FormGroup;
  public clientControl: FormControl;
  public clients$: Observable<Client[]>;
  hide: boolean;

  constructor(
    public dialogRef: MatDialogRef<OperadorCadastroComponent>
    , @Inject(MAT_DIALOG_DATA) private data: any
    , private fb: FormBuilder
    , private db: DataService
  ) {
    this.clients$ = db.clients.find();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      "id": [""],
      "name": ["", Validators.compose([Validators.required, Validators.minLength(3)])],
      "email": ["", Validators.compose([Validators.required, Validators.email])],
      "password": ["", Validators.compose([Validators.required, Validators.minLength(3)])],
      "type": ["", Validators.compose([Validators.required])],
      "clientId": [""],
      "isEnabled": [""],
      "lastLogIn": [""]
    });
    this.form.patchValue(this.data);
  }

  ngOnInit() {
  }

}
