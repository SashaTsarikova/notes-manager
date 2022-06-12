import {
  AfterViewInit, Component, ElementRef, Input, ViewChild,
} from '@angular/core';
import { INote } from '../../interfaces/INotes';
import { makeTextWithHighlight } from '../../utils/highlight';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements AfterViewInit {
  @Input() public note!: INote;

  @Input() public index!: number;

  @ViewChild('title') title: ElementRef;

  ngAfterViewInit(): void {
    this.title.nativeElement.innerHTML = makeTextWithHighlight(this.note.text);
  }
}
