/* eslint-disable class-methods-use-this */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject, map, Observable,
} from 'rxjs';
import { INote, INotes } from '../interfaces/INotes';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private allNotesSubject: BehaviorSubject<INote[]> = new BehaviorSubject<INote[]>([]);

  allNotes$: Observable<INote[]> = this.allNotesSubject.asObservable();

  private filterArr: string[];

  constructor(
    private http: HttpClient,
  ) {
    this.filterArr = [];
  }

  updateNotes() {
    this.getAllNotes()
      .subscribe((res: INote[]) => {
        this.allNotesSubject.next(res);
      });
  }

  getAllNotes(): Observable<INote[]> {
    return this.http.get<INotes>('assets/notes/startNotes.json')
      .pipe(
        map((res: INotes): INote[] => res.notes),
        map((res: INote[]): INote[] => {
          if (this.filterArr.length) {
            return res.filter((note: INote) => this.isInMarks(note.mark));
          }
          return res;
        }),
      );
  }

  changeFilterValue(mark: string) {
    if (this.filterArr.find((elem: string) => elem === mark)) {
      const newArr = this.filterArr.filter((elem: string) => elem !== mark);
      this.filterArr = newArr;
    } else {
      this.filterArr.push(mark);
    }
    this.updateNotes();
  }

  private isInMarks(marks: string[]) {
    let matchesCount = 0;
    this.filterArr.forEach((mark: string) => {
      if (marks.find((elem) => elem === mark)) {
        matchesCount += 1;
      }
    });
    return !!matchesCount;
  }
}
