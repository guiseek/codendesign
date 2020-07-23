import { CodeUploadItemComponent } from './upload-item/upload-item.component';
import {
  Input,
  OnInit,
  Output,
  EventEmitter,
  Component,
  ContentChildren,
  QueryList,
  AfterViewInit,
  AfterViewChecked,
  ViewChildren,
  HostBinding,
} from '@angular/core';
import { Upload } from './upload.interface';

@Component({
  selector: 'cnd-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class CodeUploadComponent {
  // @ViewChild(CodeUploadItemComponent, { read: true })
  // items: QueryList<CodeUploadItemComponent>;
  @HostBinding('class.cnd-upload')
  cndUpload = true;

  isHovering: boolean;

  files: File[] = [];

  observerChange(change) {
    console.log(change);
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    Array.from(files).forEach((file) => {
      this.files.push(file);
    });
  }
}
