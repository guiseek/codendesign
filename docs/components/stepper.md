---
title: Stepper
description: Stepper component
published: true
---

```typescript
import { Component } from '@angular/core';

@Component({
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent {
}
```

```html
<cnd-stepper [controls]="false">
  <cnd-step>
    <p>Step 1</p>
    <button type="button" cndStepperNext>Próximo</button>
  </cnd-step>
  <cnd-step>
    <p>Step 2</p>
    <button type="button" cndStepperPrevious>Anterior</button>
    <button type="button" cndStepperNext>Próximo</button>
  </cnd-step>
  <cnd-step>
    <p>Step 3</p>
    <button type="button" cndStepperPrevious>Anterior</button>
    <button cndStepperNext>Concluir</button>
  </cnd-step>
</cnd-stepper>
```
