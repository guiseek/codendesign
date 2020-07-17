import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CodeTableDataSource } from '@cnd/code/components';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';





@Component({
  selector: 'cnd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Code \'N Design';

  panels = [1,2,3,4,5];

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
  });
  topLevel$: Observable<ScullyRoute[]>;
  constructor(
    private scully: ScullyRoutesService
  ) {
    this.topLevel$ = this.scully.available$;
  }
  ngOnInit() {

  }
}
