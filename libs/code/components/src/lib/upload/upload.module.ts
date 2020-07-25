import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObserversModule } from '@angular/cdk/observers';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CodeUploadComponent } from './upload.component';
import { CodeUploadItemComponent } from './upload-item/upload-item.component';
import { UploadDropzoneDirective } from './upload-dropzone.directive';

@NgModule({
  declarations: [
    CodeUploadComponent,
    CodeUploadItemComponent,
    UploadDropzoneDirective,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatProgressBarModule,
    ObserversModule
  ],
  exports: [
    CodeUploadComponent,
    CodeUploadItemComponent,
    UploadDropzoneDirective,
  ],
})
export class CodeUploadModule {}
