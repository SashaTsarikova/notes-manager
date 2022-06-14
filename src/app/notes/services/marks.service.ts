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
export class MarksService {
  private allMarksSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  allMarks$: Observable<string[]> = this.allMarksSubject.asObservable();

  private updatedNotes: INote[] = [];

  constructor(
    private http: HttpClient,
  ) { }

  updateMarks() {
    this.getAllMarks()
      .subscribe((res: string[]) => {
        this.allMarksSubject.next(res);
      });
  }

  getAllMarks(): Observable<string[]> {
    return this.http.get<INotes>('assets/notes/startNotes.json')
      .pipe(
        map((res: INotes): INote[] => res.notes),
        map((res: INote[]): string[][] => {
          if (this.updatedNotes.length) {
            return this.updatedNotes.map((elem: INote) => elem.mark);
          }
          return res.map((elem: INote) => elem.mark);
        }),
        map((marksArr: string[][]): string[] => {
          const newSet = new Set(marksArr.flat(2));
          return Array.from(newSet);
        }),
      );
  }

  getUpdatedNotes(notesArr: INote[]) {
    this.updatedNotes = notesArr;
    this.updateMarks();
  }
}
