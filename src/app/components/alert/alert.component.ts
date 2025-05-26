import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-alert',
  imports: [MatDialogModule , MatButtonModule],
  template: `
    <h2 mat-dialog-title>Successfully</h2>
    <mat-dialog-content
      >Employee Details added successfully.</mat-dialog-content
    >
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Ok</button>
    </mat-dialog-actions>
  `,
  styles: ``,
})
export class AlertComponent {}
