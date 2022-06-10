import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  constructor(
    public notesService: NotesService,
  ) {}

  ngOnInit(): void {
    this.notesService.updateNotes();
  }
}
