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

  private newNotesArr: INote[] = [];

  private updatedNotesArr: INote[] = [];

  private deletedNotesArr: INote[] = [];

  public notesCount: number = 0;

  constructor(
    private http: HttpClient,
  ) {
    this.filterArr = [];
  }

  updateNotes() {
    this.getAllNotes()
      .subscribe((res: INote[]) => {
        this.notesCount = res.length;
        this.allNotesSubject.next(res);
      });
  }

  getAllNotes(): Observable<INote[]> {
    return this.http.get<INotes>('assets/notes/startNotes.json')
      .pipe(
        map((res: INotes): INote[] => res.notes.concat(this.newNotesArr)),
        map(((res: INote[]): INote[] => this.changeValues(res))),
        map((res: INote[]): INote[] => {
          if (this.filterArr.length) {
            return res.filter((note: INote) => this.isInMarks(note.mark));
          }
          return res;
        }),
      );
  }

  createNote(note: INote) {
    this.newNotesArr.push(note);
    this.updateNotes();
    console.log(this.newNotesArr);
  }

  updateNote(note: INote) {
    const indexArrNew = this.newNotesArr.map((elem: INote) => elem.id);
    const indexArrUpdated = this.updatedNotesArr.map((elem: INote) => elem.id);
    if (indexArrNew.find((elem: number) => elem === note.id)) {
      const index = indexArrNew.findIndex((elem: number) => elem === note.id);
      this.newNotesArr[index] = note;
    }
    if (indexArrUpdated.find((elem: number) => elem === note.id)) {
      const index = indexArrUpdated.findIndex((elem: number) => elem === note.id);
      this.updatedNotesArr[index] = note;
    } else {
      this.updatedNotesArr.push(note);
    }
    this.updateNotes();
  }

  deleteNote(note: INote) {
    const indexArrNew = this.newNotesArr.map((elem: INote) => elem.id);
    if (indexArrNew.find((elem: number) => elem === note.id)) {
      const index = indexArrNew.findIndex((elem: number) => elem === note.id);
      delete this.newNotesArr[index];
    } else {
      this.deletedNotesArr.push(note);
    }
    this.updateNotes();
  }

  changeValues(notesArr: INote[]): INote[] {
    const indexArrUpdated = this.updatedNotesArr.map((elem: INote) => elem.id);
    const indexArrDeleted = this.deletedNotesArr.map((elem: INote) => elem.id);
    const newArr = notesArr.map((elem: INote) => {
      if (indexArrUpdated.find((id: number) => id === elem.id)) {
        return <INote> this.updatedNotesArr.find((note: INote) => note.id === elem.id);
      }
      if (indexArrDeleted.find((id: number) => id === elem.id)) {
        return null;
      }
      return elem;
    }).filter((elem: any) => !!elem);
    return <INote[]>newArr;
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
