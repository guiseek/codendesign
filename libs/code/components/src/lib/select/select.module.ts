import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { OptionGroupComponent } from './option-group';
import { OptionComponent } from './option';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  declarations: [
    SelectComponent,
    OptionGroupComponent,
    OptionComponent
  ],
  exports: [
    SelectComponent,
    OptionGroupComponent,
    OptionComponent
  ]
})
export class CodeSelectModule { }
