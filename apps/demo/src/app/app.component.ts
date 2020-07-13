import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'cnd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'demo';

  panels = [1,2,3,4,5];

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
  })
}
