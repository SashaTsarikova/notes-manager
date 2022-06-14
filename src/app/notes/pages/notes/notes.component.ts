import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/shared/dialogs/dialog.service';
import { CreateNoteComponent } from '../../components/modals/create-note/create-note.component';
import { NotesService } from '../../services/notes.service';
import { generateUniqID } from '../../utils/generateUnicID';
import { getMarksArr } from '../../utils/getMarksArray';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  constructor(
    public notesService: NotesService,
    private dialog: DialogService,
  ) {}

  ngOnInit(): void {
    this.notesService.updateNotes();
  }

  createNewNote() {
    const dialogRef = this.dialog.open(CreateNoteComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.notesService.createNote({
          ...result,
          id: generateUniqID(),
          mark: getMarksArr(result.text),
        });
      }
    });
  }
}
