import { Observable } from 'rxjs';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router, ROUTES} from '@angular/router';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
import { map } from 'rxjs/operators';

declare var ng: any;

@Component({
  selector: 'cnd-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated

})
export class DocsComponent implements OnInit {

  components$: Observable<ScullyRoute[]>;

  ngOnInit() {}

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private scully: ScullyRoutesService
  ) {
    this.components$ = this.scully.available$.pipe(
      map((allComponents) => {
        return allComponents.filter(c => c.route.indexOf('/docs') === 0)
      })
    );
    this.scully.available$.subscribe(console.log)
  }
}
