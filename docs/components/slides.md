---
title: Slides
description: Slides
published: true

---

_**slides**.component.ts_

```typescript
import { Component } from '@angular/core';

@Component({
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss']
})
export class SlidesComponent {
  slides = [
    { headline: 'Code 1', src: '/images/slides-1.svg' },
    { headline: 'Code 2', src: '/images/slides-2.svg' },
  ];
}
```

_**slides**.component.html_

```html
<cnd-slides [slides]="slides"> </cnd-slides>
```
