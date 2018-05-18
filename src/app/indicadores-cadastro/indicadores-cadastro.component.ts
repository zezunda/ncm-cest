import { Component, OnInit, Inject } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { DataService } from "../services/data.service";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-indicadores-cadastro",
  templateUrl: "./indicadores-cadastro.component.html",
  styleUrls: ["./indicadores-cadastro.component.css"]
})
export class IndicadoresCadastroComponent implements OnInit {

  groups$: Observable<any[]>;
  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<IndicadoresCadastroComponent>
    , @Inject(MAT_DIALOG_DATA) private data: any
    , private fb: FormBuilder
    , private db: DataService
  ) {
    this.buildForm();
    this.groups$ = db.groups.findNoMap({ query: { $distinct: "groupCd" } });
   }

   buildForm(): void {
    this.form = this.fb.group({
      "id": [""],
      "cest": ["", Validators.compose([Validators.required, Validators.minLength(4)])],
      "ncm": ["", Validators.compose([Validators.required, Validators.minLength(4)])],
      "cst": [""],
      "pis": [""],
      "cofins": [""],
      "annex": [""],
      "description": [""],
      "groupCd": [""],
      "isEnabled": [""]
    });
    this.form.patchValue(this.data);
  }

  ngOnInit() {
  }

}
