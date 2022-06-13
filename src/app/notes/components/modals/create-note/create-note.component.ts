import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogRef } from 'src/app/shared/dialogs/dialogRef';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss'],
})
export class CreateNoteComponent implements OnInit {
  titleForm!: FormGroup;

  constructor(
    private dialogRef: DialogRef,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.titleForm = this.fb.group({
      text: ['', Validators.required],
    });
  }

  reject() {
    this.dialogRef.close(false);
  }

  onSubmit() {
    if (!this.titleForm.value) {
      return;
    }
    this.dialogRef.close(this.titleForm.value);
  }

  confirm() {
    this.onSubmit();
  }
}
