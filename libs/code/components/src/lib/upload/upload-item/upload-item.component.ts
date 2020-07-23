import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'cnd-upload-item',
  templateUrl: './upload-item.component.html',
  styleUrls: ['./upload-item.component.scss'],
})
export class CodeUploadItemComponent implements OnInit {
  @Output() init = new EventEmitter<File>();

  @Input() file = new File([], '', { type: 'image/svg+xml', lastModified: new Date().getTime() });

  @Input()
  public set progress(value: number) {
    this._progress = value;
  }
  public get progress(): number {
    return this._progress;
  }
  private _progress = 0;

  ngOnInit() {
    this.init.emit(this.file);
  }
}
