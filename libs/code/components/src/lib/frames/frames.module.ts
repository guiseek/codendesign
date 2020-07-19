import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeFramesComponent } from './frames.component';


@NgModule({
  declarations: [
    CodeFramesComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CodeFramesComponent,
  ],
})
export class CodeFramesModule {}
