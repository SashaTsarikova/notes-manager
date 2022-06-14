import {
  AfterViewInit, Component, ElementRef, Input, ViewChild,
} from '@angular/core';
import { DialogService } from 'src/app/shared/dialogs/dialog.service';
import { INote } from '../../interfaces/INotes';
import { NotesService } from '../../services/notes.service';
import { getMarksArr } from '../../utils/getMarksArray';
import { makeTextWithHighlight } from '../../utils/highlight';
import { UpdateNoteComponent } from '../modals/update-note/update-note.component';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements AfterViewInit {
  @Input() public note!: INote;

  @Input() public index!: number;

  @ViewChild('title') title: ElementRef;

  constructor(
    public notesService: NotesService,
    private dialog: DialogService,
  ) { }

  ngAfterViewInit(): void {
    this.title.nativeElement.innerHTML = makeTextWithHighlight(this.note.text);
  }

  deleteNote() {
    this.notesService.deleteNote(this.note);
  }

  updateNote() {
    const dialogRef = this.dialog.open(UpdateNoteComponent, { data: { text: `${this.note.text}` } });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.notesService.updateNote({
          ...result,
          id: this.note.id,
          mark: getMarksArr(result.text),
        });
      }
    });
  }
}
