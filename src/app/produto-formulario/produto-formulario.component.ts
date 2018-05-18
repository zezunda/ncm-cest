import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { DataService } from "../services/data.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Product } from "../models/Product";
import { MatSnackBar, MatSelect, MatExpansionPanel } from "@angular/material";

@Component({
  selector: "app-produto-formulario",
  templateUrl: "./produto-formulario.component.html",
  styleUrls: ["./produto-formulario.component.css"]
})
export class ProdutoFormularioComponent implements OnInit {

  constructor(private data: DataService, private fb: FormBuilder) {
    this.buildForm();
  }

  private _product: Product;
  public form: FormGroup;

  ncmItem: any = {};
  ncmOptions$: Promise<any[]>;
  ncmSelected: any = this.getNewNcmItem();

  cestTerm: string;
  cestOptions$: Observable<any[]>;
  cestSelected: any = this.getNewCestItem();

  @ViewChild("ncmSelect") ncmSelect: MatSelect;
  @ViewChild("cestSelect") cestSelect: MatSelect;
  @ViewChild("ncmExpansion") ncmExpansion: MatExpansionPanel;
  @ViewChild("cestExpansion") cestExpansion: MatExpansionPanel;

  @Input() set setProduct(value: Product) {
    this._product = value;
    this.form.patchValue(this._product);
    // REMOVE IT LATER
    const ncm = this._product.ncm.replace(".", "").replace(".", "");
    this.onNCmChanged(ncm);
    this.reset();
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

  reset() {
    this.ncmSelected = this.getNewNcmItem();
    this.cestSelected = this.getNewCestItem();
    this.ncmExpansion.close();
    if (this.form.controls["cest"].value) {
      this.cestExpansion.close();
    } else {
      if (this.form.controls["ncm"].value) {
        this.searchByNcm(this.cestTerm);
      }
    }
    this.ncmItem = {};
  }

  buildForm(): void {
    this.form = this.fb.group({
      "id": [""],
      "code": [""],
      "barCode": [""],
      "name": ["", Validators.compose([Validators.required, Validators.minLength(3)])],
      "groupCd": ["", Validators.compose([Validators.required])],
      "ncm": [""],
      "pis": [""],
      "cofins": [""],
      "cst": [""],
      "cest": [""],
      "isEnabled": [""],
    });
  }

  getNewNcmItem() {
    return {
      ncm: "",
      cest: "",
      description: "",
      img: ""
    };
  }

  getNewCestItem() {
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

  searchByName() {
    const term = this.form.controls["name"].value;
    this.ncmOptions$ = this.data.searcher.getOptions(term);
    this.ncmSelected = this.getNewNcmItem();
    this.ncmOptions$.then((result) => {
      this.ncmExpansion.open();
      if (result.length > 0) {
        setTimeout(() => {
          this.ncmSelect.open();
        }, 2);
      }
    });
  }

  searchByCode(term) {
    this.data.searcher.getItem(term)
      .then(result => {
        if (result) {
          this.ncmSelected = result;
          if (this.ncmSelected.ncm) {
            this.form.controls["ncm"].setValue(this.ncmSelected.ncm);
            this.form.controls["cest"].setValue(this.ncmSelected.cest);
            this.cestTerm = this.ncmSelected.ncm;
            if (!this.ncmSelected.cest) {
              this.searchByNcm(this.cestTerm);
            } else {
              this.cestExpansion.close();
            }
          }
        }
      });
  }

  searchByNcm(term: string) {
    term = "%" + term + "%";
    this.cestSelected = this.getNewCestItem();
    this.cestOptions$ = this.data.cest.find({ query: { ncm: { $like: term } } });
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

  onNcmSelectedChanged() {
    this.data.searcher.getItemUrl(this.ncmItem.url)
      .then(result => {
        if (result) {
          this.ncmSelected = result;
          if (this.ncmSelected.ncm) {
            this.form.controls["ncm"].setValue(this.ncmSelected.ncm);
            this.form.controls["cest"].setValue(this.ncmSelected.cest);
            this.cestTerm = this.ncmSelected.ncm;
            if (!this.ncmSelected.cest) {
              this.searchByNcm(this.cestTerm);
            } else {
              this.cestExpansion.open();
            }
          }
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
