/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { Observable, map } from 'rxjs';
import { INote } from '../../interfaces/INotes';
import { MarksService } from '../../services/marks.service';

import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-filter-block',
  templateUrl: './filter-block.component.html',
  styleUrls: ['./filter-block.component.scss'],
})
export class FilterBlockComponent implements AfterViewInit, OnInit {
  @ViewChild('select') select: MatSelect;

  filterMarks: Observable<string[]>;

  form: FormGroup;

  mark: FormControl;

  constructor(
    public notesService: NotesService,
    public marksService: MarksService,
  ) {
    this.filterMarks = this.marksService.allMarks$;

    this.mark = new FormControl('');
    this.form = new FormGroup({
      mark: this.mark,
    });
  }

  ngOnInit(): void {
    this.marksService.updateMarks();
  }

  ngAfterViewInit() {
    this.select.optionSelectionChanges
      .subscribe((res:MatOptionSelectionChange) => this.handleSelect(res));
  }

  handleSelect(event: MatOptionSelectionChange) {
    const chosenValue = event.source.value;
    this.notesService.changeFilterValue(chosenValue);
  }
}
