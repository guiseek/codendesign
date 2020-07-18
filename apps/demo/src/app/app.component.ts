import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';

@Component({
  selector: 'cnd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Code \'N Design';

  topLevel$: Observable<ScullyRoute[]>;
  constructor(
    private scully: ScullyRoutesService
  ) {
    this.topLevel$ = this.scully.available$;
  }
  ngOnInit() {

  }
}
