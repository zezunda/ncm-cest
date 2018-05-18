import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSelect, MatSort, MatInput, MatDialog } from "@angular/material";
import { merge } from "rxjs/observable/merge";
import { of as observableOf } from "rxjs/observable/of";
import { startWith } from "rxjs/operators/startWith";
import { switchMap } from "rxjs/operators/switchMap";
import { map } from "rxjs/operators/map";
import { catchError } from "rxjs/operators/catchError";
import { DataService } from "../services/data.service";
import { IndicadorQuery } from "../services/IndicadorQuery";
import { IndicadoresCadastroComponent } from "../indicadores-cadastro/indicadores-cadastro.component";
import { Indicador } from "../models/Indicador";
import { DialogService } from "../services/dialog.service";

@Component({
  selector: "app-indicadores-padroes",
  templateUrl: "./indicadores-padroes.component.html",
  styleUrls: ["./indicadores-padroes.component.css"]
})
export class IndicadoresPadroesComponent extends DialogService implements OnInit {

  resultsLength = 0;
  isLoadingResults = true;
  displayedColumns = ["cest", "ncm", "groupCd", "cst", "pis", "cofins"]; // , "annex", "description"];
  selected: Indicador = this.getNewIndicador();
  dataSource = new MatTableDataSource();
  q: IndicadorQuery = new IndicadorQuery();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatInput) input: MatInput;

  constructor(public dialog: MatDialog, data: DataService) {
    super(dialog, IndicadoresCadastroComponent, data.cest);
  }

  ngOnInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.paginator.page, this.sort.sortChange)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          this.changeQuery();
          return super.findNoMap(this.q.query);
        }),
        map(result => {
          this.resultsLength = result["total"];
          return result["data"];
        }),
        catchError((err) => {
          console.log(err);
          return observableOf([]);
        })
      ).subscribe((result) => {
        this.isLoadingResults = false;
        this.dataSource.data = result;
      });
  }

  changeQuery() {
    this.q.page = this.paginator.pageIndex;
    this.q.pageSize = this.paginator.pageSize || 10;
    this.q.sortProperty = this.sort.active || "ncm";
    this.q.sortDirection = this.sort.direction;
    this.q.term = this.input.value;
  }

  getStyle(row) {
    try {
      if (row.id === this.selected.id) {
        return "highlight";
      } else {
        return "";
      }
    } catch (error) {
      return "";
    }
  }

  getNewIndicador(): Indicador {
    return new Indicador(undefined, "", "", "", "", "", "", "", "", true);
  }

  onSelectedChanged(row) {
    this.selected = row;
  }

  newItem(): void {
    const item = this.getNewIndicador();
    this.editItem(item);
  }

  searchKeyDown(event) {
    if (event["keyCode"] == 13) {
      this.ngOnInit();
    }
  }

}
