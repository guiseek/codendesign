---
title: Text Field
description: 'Text Field component'
published: true

---
```typescript
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent {
  form = new FormGroup({
    message: new FormControl('', Validators.required),
  });
}
```

```html
<form [formGroup]="form">
  <cnd-text-field
    label="Nome"
    [minRows]="10"
    appearance="outline"
    formControlName="message"
  ></cnd-text-field>
</form>
```
