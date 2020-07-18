import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  public route = 'field';
  form = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  constructor() { }

  ngOnInit(): void {
  }

}
