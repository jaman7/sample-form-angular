import { Component, Inject, ViewChild, ViewContainerRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-universal-dialog',
  templateUrl: './universal-dialog.component.html',
})
export class UniversalDialogComponent {
  @ViewChild('dynamicContent', { read: ViewContainerRef }) viewContainerRef!: ViewContainerRef;

  constructor(
    public dialogRef: MatDialogRef<UniversalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title?: string }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
