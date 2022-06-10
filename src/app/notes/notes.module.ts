import { NgModule } from '@angular/core';
import { NotesComponent } from './pages/notes/notes.component';
import { NoteComponent } from './components/note/note.component';
import { FilterBlockComponent } from './components/filter-block/filter-block.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    NotesComponent,
    NoteComponent,
    FilterBlockComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    NotesComponent,
  ],
})
export class NotesModule { }
