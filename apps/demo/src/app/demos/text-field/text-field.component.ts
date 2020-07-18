import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent implements OnInit {
  form = new FormGroup({
    message: new FormControl('', Validators.required),
  });
  constructor() { }

  ngOnInit(): void {
  }

}
