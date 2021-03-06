---
title: Popover
description: 'Popover component'
published: true

---
```typescript
import { Component } from '@angular/core';

@Component({
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent {
  title = 'Popover title';
}
```

```html
<button
  type="button"
  [cndPopoverOpen]="popoverTmpl"
  [popoverData]="title"
  mat-stroked-button
>
  Abrir popover
</button>

<button
  style="position: absolute; bottom: 20px; right: 20px;"
  type="button"
  [cndPopoverOpen]="popoverTmpl"
  [popoverData]="title"
  mat-stroked-button
>
  Abrir
</button>

<ng-template #popoverTmpl let-data let-popover="popover">
  <h2>{{ data }}</h2>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus rem ad
    quibusdam explicabo, molestiae fugit vero.
  </p>
  <button type="button" mat-icon-button (click)="popover.close()">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="black"
      width="18px"
      height="18px"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
      />
    </svg>
  </button>
</ng-template>
```
