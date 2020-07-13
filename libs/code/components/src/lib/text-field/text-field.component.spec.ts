import { MatFormFieldModule } from '@angular/material/form-field';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatInputModule } from '@angular/material/input';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFieldComponent } from './text-field.component';
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { SpectatorHost, createHostFactory } from '@ngneat/spectator';

@Component({ selector: 'cnd-custom-host', template: '' })
class CustomHostComponent {
  form = new FormGroup({
    control: new FormControl(''),
  });
}

describe('TextFieldComponent', () => {
  let spectator: SpectatorHost<TextFieldComponent, CustomHostComponent>;
  let template: string;
  const createHost = createHostFactory({
    component: TextFieldComponent,
    host: CustomHostComponent,
    imports: [
      MatInputModule,
      TextFieldModule,
      MatFormFieldModule,
      ReactiveFormsModule,
    ],
  });
  beforeEach(() => {
    template = `
      <form [formGroup]="form">
        <cnd-text-field formControlName="control"></cnd-text-field>
      </form>
    `;
  });

  it('should create select', () => {
    spectator = createHost(template);
    expect(spectator.component).toBeTruthy();
  });
  it('should create select', () => {
    spectator = createHost(template);
    const value = { control: 'a' };

    spectator.hostComponent.form.setValue(value);

    expect(spectator.hostComponent.form.value).toStrictEqual(value);
  });
});
