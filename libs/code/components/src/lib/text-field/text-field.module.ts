import { TextFieldModule } from '@angular/cdk/text-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFieldComponent } from './text-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextFieldElementDirective } from './text-field-element.directive';

@NgModule({
  declarations: [TextFieldComponent, TextFieldElementDirective],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    TextFieldModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  exports: [TextFieldComponent, TextFieldElementDirective],
})
export class CodeTextFieldModule {}
