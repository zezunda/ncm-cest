import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule, MatStepperModule } from "@angular/material";
import { MatDialogModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatProgressBarModule } from "@angular/material";
import { MatTooltipModule, MatCardModule, MatProgressSpinnerModule, MatDividerModule, MatCheckboxModule } from "@angular/material";
import { MatTableModule, MatPaginatorModule, MatTabsModule, MatListModule, MatSortModule } from "@angular/material";
import { MatAutocompleteModule, MatExpansionModule, MatSnackBarModule, MatSlideToggleModule } from "@angular/material";

import { MainPageComponent } from "./main-page/main-page.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { HomeComponent } from "./home/home.component";
import { OperadoresComponent } from "./operadores/operadores.component";
import { ClientesComponent } from "./clientes/clientes.component";
import { ProdutosComponent } from "./produtos/produtos.component";
import { ContaComponent } from "./conta/conta.component";
import { OperadorCadastroComponent } from "./operador-cadastro/operador-cadastro.component";
import { ClienteCadastroComponent } from "./cliente-cadastro/cliente-cadastro.component";
import { ProdutoCadastroComponent } from "./produto-cadastro/produto-cadastro.component";
import { ConfiguracoesComponent } from "./configuracoes/configuracoes.component";
import { AjudaComponent } from "./ajuda/ajuda.component";
import { ImportacaoComponent } from "./importacao/importacao.component";
import { Feathers } from "./services/feathers.service";
import { DataService } from "./services/data.service";
import { YesNoComponent } from "./yes-no/yes-no.component";
import { FilterPipe } from "./filter-pipe.pipe";
import { ProdutoFormularioComponent } from "./produto-formulario/produto-formulario.component";
import { ProdutoAtualizacaoComponent } from "./produto-atualizacao/produto-atualizacao.component";
import { NovaImportacaoComponent } from "./nova-importacao/nova-importacao.component";
import { AutoFillComponent } from "./auto-fill/auto-fill.component";
import { DropzoneModule } from "ngx-dropzone-wrapper";
import { DROPZONE_CONFIG } from "ngx-dropzone-wrapper";
import { DropzoneConfigInterface } from "ngx-dropzone-wrapper";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./guards/auth.guard";
import { AuthService } from "./services/auth.service";
import { AppRouterComponent } from "./app-router/app-router.component";
import { IndicadoresPadroesComponent } from "./indicadores-padroes/indicadores-padroes.component";
import { IndicadoresCadastroComponent } from './indicadores-cadastro/indicadores-cadastro.component';
import { ProdutoTemplateComponent } from './produto-template/produto-template.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: "http://localhost:3030/uploads",
  maxFiles: 1,
  uploadMultiple: false,
  paramName: "uri",
  maxFilesize: 50,
  // previewsContainer: false
};


const appRoutes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "main"
  },
  {
    path: "main",
    component: MainPageComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "home"
      },
      {
        path: "**",
        pathMatch: "full",
        redirectTo: "main"
      },
      {
        path: "home",
        component: HomeComponent
      },
      {
        path: "operadores",
        component: OperadoresComponent
      },
      {
        path: "clientes",
        component: ClientesComponent
      },
      {
        path: "produtos",
        component: ProdutosComponent
      },
      {
        path: "conta",
        component: OperadorCadastroComponent
      },
      {
        path: "configuracoes",
        component: ConfiguracoesComponent
      },
      {
        path: "ajuda",
        component: AjudaComponent
      },
      {
        path: "importacao",
        component: ImportacaoComponent
      },
      {
        path: "indicadores-padroes",
        component: IndicadoresPadroesComponent
      },
      {
        path: "**",
        pathMatch: "full",
        redirectTo: "home"
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "main"
  }
];

@NgModule({
  declarations: [
    AppRouterComponent,
    MainPageComponent,
    ToolbarComponent,
    HomeComponent,
    OperadoresComponent,
    ClientesComponent,
    ProdutosComponent,
    ContaComponent,
    OperadorCadastroComponent,
    ClienteCadastroComponent,
    ProdutoCadastroComponent,
    ConfiguracoesComponent,
    AjudaComponent,
    ImportacaoComponent,
    YesNoComponent,
    FilterPipe,
    ProdutoFormularioComponent,
    ProdutoAtualizacaoComponent,
    NovaImportacaoComponent,
    AutoFillComponent,
    LoginComponent,
    IndicadoresPadroesComponent,
    IndicadoresCadastroComponent,
    ProdutoTemplateComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTooltipModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatListModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatSortModule,
    MatStepperModule,
    DropzoneModule,
    MatProgressBarModule,
    MatCheckboxModule
  ],
  entryComponents: [
    OperadorCadastroComponent,
    ClienteCadastroComponent,
    ProdutoCadastroComponent,
    ProdutoAtualizacaoComponent,
    ProdutoTemplateComponent,
    IndicadoresCadastroComponent,
    AutoFillComponent,
    YesNoComponent
  ],
  providers: [
    Feathers,
    DataService,
    AuthService,
    AuthGuard,
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],
  bootstrap: [AppRouterComponent]
})
export class AppModule { }
