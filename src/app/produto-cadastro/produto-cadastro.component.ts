import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { Product } from "../models/Product";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ProdutoFormularioComponent } from "../produto-formulario/produto-formulario.component";
import { DataService } from "../services/data.service";

@Component({
  selector: "app-produto-cadastro",
  templateUrl: "./produto-cadastro.component.html",
  styleUrls: ["./produto-cadastro.component.css"]
})
export class ProdutoCadastroComponent implements OnInit {

  @ViewChild(ProdutoFormularioComponent) productForm: ProdutoFormularioComponent;

  selectedProduct: Product;
  constructor(public dialogRef: MatDialogRef<ProdutoCadastroComponent>,
    @Inject(MAT_DIALOG_DATA) public item: any, private data: DataService) {
    this.selectedProduct = item;
  }

  saveItem() {
    const product = this.productForm.form.value as Product;
    if (product.id) {
      this.data.products.update(product.id, product);
    } else {
      this.data.products.create(product);
    }
  }

  ngOnInit() {
  }

}
