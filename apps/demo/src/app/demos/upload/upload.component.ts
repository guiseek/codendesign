import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cnd-demos-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  items = [];

  constructor() {}

  ngOnInit(): void {
    this.items[0] = new File([], 'file1.svg', {
      type: 'image/svg+xml',
      lastModified: new Date().getTime(),
    });
  }
}
