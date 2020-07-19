import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, Validators } from '@angular/forms';
import { text, number, boolean } from '@storybook/addon-knobs';
import { CodeFieldModule } from './field.module';
import { FieldComponent } from './field.component';

export default {
  title: 'Field'
}

export const simple = () => ({
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      CodeFieldModule
    ]
  },
  component: FieldComponent,
  props: {
    label: "Nome",
    formControl: new FormControl(),
  }
})

export const appearance = () => ({
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      CodeFieldModule
    ]
  },
  component: FieldComponent,
  props: {
    label: "Nome",
    appearance: "outline",
    formControl: new FormControl(),
  }
})

export const required = () => ({
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      CodeFieldModule
    ]
  },
  component: FieldComponent,
  props: {
    label: "Nome",
    appearance: "outline",
    formControl: new FormControl('', Validators.required),
  }
})
