import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OptionComponent } from './option/option.component';

import { SelectComponent } from './select.component';
import {
  ReactiveFormsModule,
  FormsModule,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { Component } from '@angular/core';

@Component({ selector: 'cnd-custom-host', template: '' })
class CustomHostComponent {
  form = new FormGroup({
    control: new FormControl(''),
  });
}

describe('SelectComponent', () => {
  let spectator: SpectatorHost<SelectComponent, CustomHostComponent>;
  let template: string;
  const createHost = createHostFactory({
    component: SelectComponent,
    host: CustomHostComponent,
    declarations: [OptionComponent],
    imports: [
      CommonModule,
      FormsModule,
      MatInputModule,
      MatSelectModule,
      MatFormFieldModule,
      ReactiveFormsModule,
    ],
  });

  beforeEach(() => {
    template = `
      <form [formGroup]="form">
        <cnd-select formControlName="control">
          <cnd-option [value]="">A</cnd-option>
        </cnd-select>
      </form>
    `;
  });

  it('should create select', () => {
    spectator = createHost(template);
    expect(spectator.component).toBeTruthy();
  });
  it('should create select', () => {
    spectator = createHost(template);
    const value = { control: 'a' }

    spectator.hostComponent.form.setValue(value);

    expect(spectator.hostComponent.form.value).toStrictEqual(value);
  });
});
