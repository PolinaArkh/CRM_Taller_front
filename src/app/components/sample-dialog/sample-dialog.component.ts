import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-sample-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './sample-dialog.component.html',
  styleUrl: './sample-dialog.component.scss',
})
export class SampleDialogComponent {}
