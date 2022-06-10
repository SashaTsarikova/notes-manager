/* eslint-disable class-methods-use-this */
import { SelectionChange } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { INote } from '../../interfaces/INotes';

import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-filter-block',
  templateUrl: './filter-block.component.html',
  styleUrls: ['./filter-block.component.scss'],
})
export class FilterBlockComponent {
  filterMarks: Observable<string[]>;

  toppings:FormControl;

  selectedMark: null | string;

  constructor(
    public notesService: NotesService,
  ) {
    this.filterMarks = this.notesService.allNotes$.pipe(
      map((notesArr: INote[]) => notesArr.map((elem: INote) => elem.mark)),
      map((marksArr: string[]) => {
        const newSet = new Set(marksArr.flat(2));
        return [...newSet];
      }),
    );

    this.toppings = new FormControl('');
    this.selectedMark = null;
  }

  handleSelect(event: Event) {
    console.log(event);
  }
}
