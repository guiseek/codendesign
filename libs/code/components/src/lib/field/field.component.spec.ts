import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FieldComponent } from './field.component';
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { SpectatorHost, createHostFactory } from '@ngneat/spectator';

@Component({ selector: 'cnd-custom-host', template: '' })
class CustomHostComponent {
  form = new FormGroup({
    control: new FormControl(''),
  });
}

describe('FieldComponent', () => {
  let spectator: SpectatorHost<FieldComponent, CustomHostComponent>;
  let template: string;
  const createHost = createHostFactory({
    component: FieldComponent,
    host: CustomHostComponent,
    imports: [
      MatInputModule,
      MatFormFieldModule,
      ReactiveFormsModule,
    ],
  });

  beforeEach(() => {
    template = `
      <form [formGroup]="form">
        <cnd-field formControlName="control"></cnd-field>
      </form>
    `;
  });

  it('should create select', () => {
    spectator = createHost(template);
    expect(spectator.component).toBeTruthy();
  });
});
