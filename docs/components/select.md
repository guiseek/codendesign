---
title: Select
description: 'Select component'
published: true

---
```typescript
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  options = [
    {
      value: { message: 'Lorem ipsum dolor sit' },
      viewValue: 'Lorem ipsum dolor sit',
    },
    {
      value: { message: 'Perferendis similique' },
      viewValue: 'Perferendis similique',
    }
  ];
}
```

```html
<form [formGroup]="form">
  <cnd-select formControlName="name" label="Select Component">
    <cnd-option *ngFor="let item of options" [value]="item">
      {{ item.viewValue }}
    </cnd-option>
  </cnd-select>
</form>
```
