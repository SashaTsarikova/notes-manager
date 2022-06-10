import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

const MATERIALS = [
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  MatSelectModule,
];

@NgModule({
  imports: [MATERIALS],
  exports: [MATERIALS],
})

export class MaterialModule {}
