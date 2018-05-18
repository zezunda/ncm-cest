import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.css']
})
export class ClienteCadastroComponent implements OnInit {

  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ClienteCadastroComponent>
    , @Inject(MAT_DIALOG_DATA) public data: any
    , private formBuilder: FormBuilder
    , private db: DataService
  ) {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      'id': [''],
      'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'cnpj': ['', Validators.compose([Validators.required, Validators.minLength(14), Validators.maxLength(14)])],
      'isEnabled': ['']
    });
    this.form.patchValue(this.data);
  }

  ngOnInit() {
  }

}
