---
title: Field
description: blog description
published: true
---
```typescript
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
  });
}
```

```html
<form [formGroup]="form">
  <cnd-field label="Nome" formControlName="name"></cnd-field>
</form>
```
