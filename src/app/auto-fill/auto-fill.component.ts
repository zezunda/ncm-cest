import { Component, OnInit, Inject } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Product } from "../models/Product";
import { DataService } from "../services/data.service";
import { ProductQuery } from "../services/ProductQuery";
import { Observer } from "rxjs/Observer";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { element } from "protractor";

@Component({
  selector: "app-auto-fill",
  templateUrl: "./auto-fill.component.html",
  styleUrls: ["./auto-fill.component.css"]
})
export class AutoFillComponent implements OnInit {

  public mode = "indeterminate";
  public value = 0;
  listLength = 0;

  private items$: Observable<Product[]>;
  public changed: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<AutoFillComponent>,
    @Inject(MAT_DIALOG_DATA) private query: ProductQuery,
    private data: DataService,
    public snackBar: MatSnackBar
  ) { }

  public init() {
    this.items$ = this.data.products.findNoMap(this.query.query);
    this.items$.subscribe(resp => {
      if (this.value < 100) {
        this.Loop(resp["data"] as Product[], this.query);
      }
    });
  }

  private Loop(list: Product[], query: ProductQuery) {
    list = list.filter(prod => prod.barCode.length >= 8);
    this.listLength = list.length;
    if (this.listLength > 0) {
      this.mode = "determinate";
      list.forEach(async prod => {
        const ncmCest = await this.data.searcher.getItem(prod.barCode);
        if (ncmCest) {
          if (ncmCest["ncm"]) {
            prod.ncm = prod.ncm || ncmCest["ncm"];
            this.changed.push({ name: prod.name, event: "NCM encontrado pelo Cosmos.", product: prod });
          }
          if (ncmCest["cest"]) {
            prod.cest = prod.cest || ncmCest["cest"];
            this.changed.push({ name: prod.name, event: "CEST encontrado pelo Cosmos.", product: prod });
          }
        }
        this.value += (100 / this.listLength);
        const ncm = prod.ncm.replace(".", "").replace(".", "");
        const term = `%${ncm.slice(0, 4)}.${ncm.slice(4, 6)}.${ncm.slice(6)}%`;
        // if (prod.cest.length === 0) {
          const cests$ = await this.data.cest.find({ query: { ncm: { $like: term } } });
          cests$.subscribe(cests => {
            if (cests.length === 1) {
              prod.cest = cests[0].cest;
              prod.cst = cests[0].cst;
              prod.pis = cests[0].pis;
              prod.cofins = cests[0].cofins;
              this.changed.push({ name: prod.name, event: "CEST encontrado no próprio banco de dados.", product: prod });
            }
          });
        // }
      });
    } else {
      this.snackBar.open("Nenhum item a ser pesquisado.", "Fechar", {
        duration: 2000,
      });
    }
  }

  ngOnInit() {
    this.init();
  }
}
