import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarResource, SnackbarTypes } from "../shared/types";
import { SnackbarComponent } from "../shared/snackbar/snackbar.component";


@Injectable()
export class SnackbarService {
    constructor(
        private _snackbar: MatSnackBar
    ){}

    showSnackBarNotification(message: string, type:SnackbarTypes){
        const data: SnackbarResource = {
            message,
            type,
        };
        this._snackbar.openFromComponent(SnackbarComponent, {
            duration: 8000,
            data,
        });
    }

    // showSnackBarNotification(message: string, type: SnackbarTypes) {
    //     this.snackBar.open(message, 'Close', {
    //       duration: 3000,
    //       panelClass: type
    //     });
    //   }
}