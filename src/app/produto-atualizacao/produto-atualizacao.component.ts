import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MAT_DIALOG_DATA, MatSelect } from "@angular/material";
import { Observable } from "rxjs/Observable";
import { merge } from "rxjs/observable/merge";
import { of as observableOf } from "rxjs/observable/of";
import { catchError } from "rxjs/operators/catchError";
import { map } from "rxjs/operators/map";
import { startWith } from "rxjs/operators/startWith";
import { switchMap } from "rxjs/operators/switchMap";
import { DataService } from "../services/data.service";
import { Product } from "../models/Product";
import { ProdutoFormularioComponent } from "../produto-formulario/produto-formulario.component";
import { ProductQuery } from "../services/ProductQuery";

@Component({
  selector: "app-produto-atualizacao",
  templateUrl: "./produto-atualizacao.component.html",
  styleUrls: ["./produto-atualizacao.component.css"]
})
export class ProdutoAtualizacaoComponent implements OnInit {

  canSave = false;
  resultsLength = 0;
  isLoadingResults = true;
  displayedColumns = ["name"];
  dataSource = new MatTableDataSource();
  selectedProduct: Product = new Product(undefined, "", "", "", "", "", "", "", "", "", true, false);

  @ViewChild(ProdutoFormularioComponent) productForm: ProdutoFormularioComponent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private data: DataService, public dialogRef: MatDialogRef<ProdutoAtualizacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public query: ProductQuery) {
    query.pageSize = 10;
  }

  ngOnInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.paginator.page, this.sort.sortChange)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          this.query.page = this.paginator.pageIndex;
          this.query.sortProperty = this.sort.active || "name";
          this.query.sortDirection = this.sort.direction;
          return this.data.products.findNoMap(this.query.query);
        }),
        map(result => {
          this.isLoadingResults = false;
          this.resultsLength = result["total"];
          return result["data"];
        }),
        catchError(() => {
          return observableOf([]);
        })
      ).subscribe((result: Product[]) => {
        this.isLoadingResults = false;
        this.dataSource.data = result;
        this.selectFirstItem();
      });
  }

  selectFirstItem() {
    const exist = this.dataSource.data.filter(product => product["id"] === this.selectedProduct.id);
    if (exist.length === 0) {
      this.selectedProduct = this.dataSource.data[0] as Product;
    } else {
      this.selectedProduct = exist[0] as Product;
    }
  }

  onSelectedProductChanged(row) {
    this.selectedProduct = row;
  }

  getStyle(row) {
    if (row.id === this.selectedProduct.id) {
      return "highlight";
    }
    else if (row.cest && row.ncm) {
      return "classified";
         }
    else if (row.barCode.length < 8) {
      return "missingBarCode";
         }
    else { return ""; }
  }

  onPrevious() {
    const index = this.dataSource.data.indexOf(this.selectedProduct) - 1;
    if (this.canPrevious()) {
      if (index < 0) {
        this.paginator.previousPage();
      } else {
        this.selectedProduct = this.dataSource.data[index] as Product;
      }
    }
  }

  onNext() {
    const index = this.dataSource.data.indexOf(this.selectedProduct) + 1;
    const srcLen = this.dataSource.data.length;
    if (this.canNext()) {
      if (index < srcLen) {
        this.selectedProduct = this.dataSource.data[index] as Product;
      } else {
        this.paginator.nextPage();
      }
    }
    if (this.canSave) {
      const product = this.productForm.form.value;
      this.data.products.update(product.id, product);
      this.canSave = false;
    }
  }

  canPrevious() {
    const index = this.dataSource.data.indexOf(this.selectedProduct) - 1;
    if (this.selectedProduct.id) {
      if (this.paginator.hasPreviousPage()) {
        return true;
      }
      return index >= 0;
    }
    return false;
  }

  canNext() {
    const index = this.dataSource.data.indexOf(this.selectedProduct) - 1;
    if (this.selectedProduct.id) {
      return this.paginator.hasNextPage() || index <= this.dataSource.data.length;
    }
    return false;
  }

}
