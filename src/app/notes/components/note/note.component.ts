import { Component, Input } from '@angular/core';
import { INote } from '../../interfaces/INotes';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent {
  @Input() public note!: INote;

  @Input() public index!: number;
}
