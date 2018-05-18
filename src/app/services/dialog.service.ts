import { MatDialog } from "@angular/material";
import { YesNoComponent } from "../yes-no/yes-no.component";
import { DataService } from "./data.service";

export class DialogService {

    private delMsg = "Deseja realmente remover este item?";

    constructor(public dialog: MatDialog, public component: any, public data: any) { }

    find(query?) {
        return this.data.find(query);
    }

    findNoMap(query?) {
        return this.data.findNoMap(query);
    }

    editItem(item: any): void {
        const dialogRef = this.dialog.open(this.component, {
            width: "800px",
            data: item
        });
        dialogRef.afterClosed().subscribe(
            result => {
                if (result) {
                    this.saveItem(result);
                }
            });
    }

    saveItem(item: any) {
        if (item.id) {
            this.data.update(item.id, item);
        } else {
            this.data.create(item);
        }
    }

    removeItem(item: any): void {
        const dialogRef = this.dialog.open(YesNoComponent, {
            width: "500px",
            data: { title: "Exclusão", content: this.delMsg }
        });
        dialogRef.afterClosed().subscribe(
            result => {
                if (result) {
                    this.data.remove(item.id);
                }
            });
    }

    toggleItem(item: any): void {
        this.data.patch(item.id, { isEnabled: !item.isEnabled });
    }

}
