import { Component, OnInit, TemplateRef } from '@angular/core';
import { Dialog } from '@cnd/code/components';

@Component({
  selector: 'cnd-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
    private dialog: Dialog
  ) { }

  ngOnInit(): void {
  }

  onClick(template: TemplateRef<HTMLElement>) {
    this.dialog.openFromTemplate(template);
  }

}
