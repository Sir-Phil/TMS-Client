import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { SnackbarResource, SnackbarTypes } from '../types';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';



@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  encapsulation:ViewEncapsulation.None,
})
export class SnackbarComponent {
  
  snackbarTypes = SnackbarTypes;

  constructor (
    public snackBarRef: MatSnackBarRef<SnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackbarResource,
  ){

  }
}
