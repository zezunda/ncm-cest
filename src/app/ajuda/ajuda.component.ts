import { Component, OnInit, ViewChild } from "@angular/core";
import { DropzoneComponent } from "ngx-dropzone-wrapper";

@Component({
  selector: "app-ajuda",
  templateUrl: "./ajuda.component.html",
  styleUrls: ["./ajuda.component.css"]
})
export class AjudaComponent implements OnInit {

  @ViewChild(DropzoneComponent) componentRef: DropzoneComponent;

  uploadProgress = 0;

  constructor() { }

  public onUploadError(args: any): void {
    console.log("onUploadError:", args);
  }

  public onUploadSuccess(args: any): void {
    console.log(args[1].id);
  }



  ngOnInit() {
    this.componentRef.DZ_UPLOADPROGRESS.subscribe(progress => this.uploadProgress = progress[1]);
  }

}
