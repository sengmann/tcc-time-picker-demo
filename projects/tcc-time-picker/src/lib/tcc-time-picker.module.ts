import { NgModule } from '@angular/core';
import { TccTimePickerComponent } from './tcc-time-picker.component';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  declarations: [TccTimePickerComponent],
  exports: [TccTimePickerComponent]
})
export class TccTimePickerModule {
}
