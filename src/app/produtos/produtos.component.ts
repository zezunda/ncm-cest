import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatTableDataSource, MatPaginator, MatSelect, MatSort, MatInput, MatTable, MatSnackBar } from "@angular/material";
import { Observable } from "rxjs/Observable";
import { merge } from "rxjs/observable/merge";
import { of as observableOf } from "rxjs/observable/of";
import { catchError } from "rxjs/operators/catchError";
import { map } from "rxjs/operators/map";
import { startWith } from "rxjs/operators/startWith";
import { switchMap } from "rxjs/operators/switchMap";
import { DataService } from "../services/data.service";
import { Product } from "../models/Product";
import { ProdutoCadastroComponent } from "../produto-cadastro/produto-cadastro.component";
import { ProductQuery } from "../services/ProductQuery";
import { ProdutoAtualizacaoComponent } from "../produto-atualizacao/produto-atualizacao.component";
import { AutoFill } from "../services/autofill.service";
import { AutoFillComponent } from "../auto-fill/auto-fill.component";
import { ProdutoTemplateComponent } from "../produto-template/produto-template.component";
import { element } from "protractor";
import { Client } from "../models/Client";

@Component({
  selector: "app-produtos",
  templateUrl: "./produtos.component.html",
  styleUrls: ["./produtos.component.css"]
})
export class ProdutosComponent implements OnInit {

  groups$: Observable<any[]>;
  clients$: Observable<Client[]>;
  resultsLength = 0;
  isLoadingResults = true;
  displayedColumns = ["isSelected", "name", "barCode", "groupCd", "ncm", "cest", "cst", "pis", "cofins"];
  dataSource = new MatTableDataSource();
  selectedProduct: Product = this.getNewProduct();
  q: ProductQuery = new ProductQuery();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild("selectGroup") selectGroup: MatSelect;
  @ViewChild("selectClient") selectClient: MatSelect;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatInput) input: MatInput;
  @ViewChild(MatTable) table: MatTable<Product>;

  constructor(public dialog: MatDialog, private data: DataService, public snackBar: MatSnackBar) {
    this.groups$ = data.groups.findNoMap({ query: { $distinct: "groupCd" } });
    this.clients$ = data.clients.find();
  }

  ngOnInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.selectGroup.selectionChange.subscribe(() => this.paginator.pageIndex = 0);
    this.selectClient.selectionChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.paginator.page, this.selectGroup.selectionChange, this.selectClient.selectionChange, this.sort.sortChange)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          this.changeQuery();
          return this.data.products.findNoMap(this.q.query);
        }),
        map(result => {
          // this.isLoadingResults = false;
          this.resultsLength = result["total"];
          return result["data"];
        }),
        catchError((err) => {
          console.log(err);
          return observableOf([]);
        })
      ).subscribe((result: Product[]) => {
        this.isLoadingResults = false;
        this.dataSource.data = result as Product[];
        this.selectFirstItem();
      });
  }

  changeQuery() {
    this.q.page = this.paginator.pageIndex;
    this.q.pageSize = this.paginator.pageSize || 10;
    this.q.group = this.selectGroup.value;
    this.q.client = this.selectClient.value;
    this.q.sortProperty = this.sort.active || "name";
    this.q.sortDirection = this.sort.direction;
    this.q.term = this.input.value;
    console.log(this.q.query);
  }

  selectFirstItem() {
    if (this.selectedProduct) {
      const exist = this.dataSource.data.filter(product => product["id"] === this.selectedProduct.id);
      if (exist.length === 0) {
        this.selectedProduct = this.dataSource.data[0] as Product;
      }
    }
  }

  onSelectedProductChanged(row) {
    this.selectedProduct = row;
  }

  getStyle(row) {
    try {
      if (row.id === this.selectedProduct.id) {
        return "highlight";
      } else if (row.barCode.length < 8) {
        return "missingBarCode";
      } else if (!row.cest) {
        return "";
      } else if (!row.ncm) {
        return "";
      } else {
        return "classified";
      }
    } catch (error) {
      return "";
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getNewProduct(): Product {
    return new Product(undefined, "", "", "", "", "", "", "", "", "", true, false);
  }

  editItem(item: Product): void {
    const dialogRef = this.dialog.open(ProdutoCadastroComponent, {
      width: "70%",
      height: "auto",
      data: item
    });
  }

  newItem(): void {
    const item: Product = this.getNewProduct();
    this.editItem(item);
  }

  openDialog(): void {
    const ProdutoAtualizacao = this.dialog.open(ProdutoAtualizacaoComponent, {
      width: "70%",
      height: "auto",
      data: this.q
    });
  }

  autofill() {
    const AutoFill = this.dialog.open(AutoFillComponent, {
      width: "70%",
      height: "auto",
      data: this.q
    });
    AutoFill.afterClosed().subscribe(
      result => {
        if (result) {
          result.forEach(element => {
            this.data.products.patch(element.product.id, element.product);
          });
        }
      });
  }

  applyDefault() {
    const list: Product[] = this.dataSource.data.filter((prod: Product) => prod.isSelected === true) as Product[];
    if (list.length > 0) {
      const ProdutoTemplate = this.dialog.open(ProdutoTemplateComponent, {
        width: "70%",
        height: "auto",
        data: list
      });
      ProdutoTemplate.afterClosed().subscribe(
        result => {
          if (result) {
            list.forEach((element: Product) => {
              element.groupCd = result.groupCd;
              element.ncm = result.ncm;
              element.cest = result.cest;
              element.cst = result.cst;
              element.pis = result.pis;
              element.cofins = result.cofins;
              this.data.products.patch(element.id, element);
            });
            /*
            const cest$ = this.data.cest.find({ query: { ncm: { $like: result.ncm } } });
            cest$.subscribe(resp => {
              if (resp.length) {
                const cest = resp[0];
                console.log(cest);
              } else {
                console.log("not found");
              }
            });
            */
          }
        });
    } else {
      this.snackBar.open("Selecione pelo menos um produto.", "Fechar", {
        duration: 3000,
      });
    }
  }

  searchKeyDown(event) {
    if (event["keyCode"] == 13) {
      this.ngOnInit();
    }
  }

  selectAll() {
    const selectedLength = this.dataSource.data.filter((prod: Product) => prod.isSelected === true).length;
    let value = true;
    if (selectedLength === this.dataSource.data.length) {
      value = false;
    }
    this.dataSource.data.forEach((element: Product) => {
      element.isSelected = value;
    });
  }

}
