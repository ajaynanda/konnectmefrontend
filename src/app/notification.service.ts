import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  config:MatSnackBarConfig={
    duration:3000,
    horizontalPosition:'right',
    verticalPosition:'top'
  }
  constructor(private snackBar:MatSnackBar) { }
  showSuccess(message:string){
    this.config['panelClass'] = ['notification','success']
    this.snackBar.open(message)
  }
  showError(message:string){
    this.config['panelClass'] = ['notification','error']
    this.snackBar.open(message)
  }
}
