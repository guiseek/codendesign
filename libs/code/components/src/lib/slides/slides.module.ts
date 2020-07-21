import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeSlidesComponent } from './slides.component';


@NgModule({
  declarations: [
    CodeSlidesComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CodeSlidesComponent,
  ],
})
export class CodeSlidesModule {}
