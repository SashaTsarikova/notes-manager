import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogRef } from 'src/app/shared/dialogs/dialogRef';
import { DIALOG_DATA } from 'src/app/shared/dialogs/dialogToken';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent implements OnInit {
  editForm!: FormGroup;

  constructor(
    private dialogRef: DialogRef,
    private fb: FormBuilder,
    @Inject(DIALOG_DATA) public data: {
      text : string;
    },
  ) { }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      text: [this.data.text, Validators.required],
    });
  }

  reject() {
    this.dialogRef.close(false);
  }

  onSubmit() {
    if (!this.editForm.value) {
      return;
    }
    this.dialogRef.close(this.editForm.value);
  }

  confirm() {
    this.onSubmit();
  }
}
