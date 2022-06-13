import { NgModule } from '@angular/core';
import { NotesComponent } from './pages/notes/notes.component';
import { NoteComponent } from './components/note/note.component';
import { FilterBlockComponent } from './components/filter-block/filter-block.component';
import { SharedModule } from '../shared/shared.module';
import { CreateNoteComponent } from './components/modals/create-note/create-note.component';
import { UpdateNoteComponent } from './components/modals/update-note/update-note.component';

@NgModule({
  declarations: [
    NotesComponent,
    NoteComponent,
    FilterBlockComponent,
    CreateNoteComponent,
    UpdateNoteComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    NotesComponent,
  ],
})
export class NotesModule { }
