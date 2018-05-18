import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ImportacaoComponent } from '../importacao/importacao.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    let dialogRef = this.dialog.open(ImportacaoComponent, { width: '800px' });
  }


  ngOnInit() {
  }

}
