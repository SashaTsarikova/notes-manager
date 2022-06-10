import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject, map, Observable, of, tap,
} from 'rxjs';
import { INote, INotes } from '../interfaces/INotes';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private allNotesSubject: BehaviorSubject<INote[]> = new BehaviorSubject<INote[]>([]);

  allNotes$: Observable<INote[]> = this.allNotesSubject.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

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
      );
  }
}
