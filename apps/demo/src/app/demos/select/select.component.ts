import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
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
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
