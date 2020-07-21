---
title: Dialog
description: 'dialog description'
published: true

---
```typescript
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Dialog } from '@cnd/code/components';

@Component({
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  public route = 'dialog';
  constructor(
    private dialog: Dialog
  ) { }

  ngOnInit(): void {
  }

  onClick(template: TemplateRef<HTMLElement>) {
    this.dialog.openFromTemplate(template);
  }

}
```

```html
<button mat-stroked-button (click)="onClick(dialogTmpl)">
  Abrir dialog
</button>

<ng-template #dialogTmpl>
  <h1>Dialog</h1>
</ng-template>
```
