import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { MatExpansionPanel, MatSelect, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-produto-template',
  templateUrl: './produto-template.component.html',
  styleUrls: ['./produto-template.component.css']
})
export class ProdutoTemplateComponent implements OnInit {

  cestTerm: string;
  cestOptions$: Observable<any[]>;
  cestSelected: any = this.getNewCestItem();
  public form: FormGroup;
  @ViewChild("cestSelect") cestSelect: MatSelect;
  @ViewChild("cestExpansion") cestExpansion: MatExpansionPanel;

  constructor(
    public dialogRef: MatDialogRef<ProdutoTemplateComponent>
    , @Inject(MAT_DIALOG_DATA) public data: any
    , private fb: FormBuilder
    , private db: DataService
  ) {
    this.buildForm();
    this.form.controls["groupCd"].setValue(data[0].groupCd);
    this.form.controls["ncm"].setValue(data[0].ncm);
    this.form.controls["cest"].setValue(data[0].cest);
    this.form.controls["cst"].setValue(data[0].cst);
    this.form.controls["pis"].setValue(data[0].pis);
    this.form.controls["cofins"].setValue(data[0].cofins);
    this.onNCmChanged(data[0].ncm);
  }

  buildForm(): void {
    this.form = this.fb.group({
      "groupCd": ["", Validators.compose([Validators.required])],
      "ncm": [""],
      "pis": [""],
      "cofins": [""],
      "cst": [""],
      "cest": [""]
    });
  }

  private getNewCestItem() {
    return {
      ncm: "",
      cest: "",
      cst: "",
      pis: "",
      cofins: "",
      description: "",
      annex: ""
    };
  }

  onNCmChanged(ncm: string) {
    ncm = ncm.replace(".", "").replace(".", "");
    if (ncm.length >= 8) {
      this.cestTerm = `${ncm.slice(0, 4)}.${ncm.slice(4, 6)}.${ncm.slice(6)}`;
    } else if (ncm.length < 8 && ncm.length > 4) {
      this.cestTerm = `${ncm.slice(0, 4)}.${ncm.slice(4, 6)}`;
    } else {
      this.cestTerm = ncm;
    }
  }

  searchByNcm(term: string) {
    term = "%" + term + "%";
    this.cestSelected = this.getNewCestItem();
    this.cestOptions$ = this.db.cest.find({ query: { ncm: { $like: term } } });
    this.cestOptions$.subscribe(result => {
      if (result.length === 1) {
        this.cestSelected = result[0];
        this.onCestSelectedChanged();
      } else {
        this.cestExpansion.open();
        setTimeout(() => {
          this.cestSelect.open();
        }, 2);
      }
    });
  }

  onCestSelectedChanged() {
    this.form.controls["cest"].setValue(this.cestSelected.cest);
    this.form.controls["cst"].setValue(this.cestSelected.cst);
    this.form.controls["pis"].setValue(this.cestSelected.pis);
    this.form.controls["cofins"].setValue(this.cestSelected.cofins);
  }

  shortTerm() {
    this.cestTerm = this.cestTerm.slice(0, (this.cestTerm.length - 3));
    this.searchByNcm(this.cestTerm);
  }

  ngOnInit() {
  }

}
