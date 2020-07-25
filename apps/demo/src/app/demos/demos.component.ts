import { DocsService } from './../shared/docs.service';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { children } from './route-children';
import {
  MediaMatcher,
  BreakpointObserver,
  Breakpoints,
} from '@angular/cdk/layout';

@Component({
  selector: 'cnd-demos',
  templateUrl: './demos.component.html',
  styleUrls: ['./demos.component.scss'],
})
export class DemosComponent implements OnInit, OnDestroy {

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  links = children.map(({ path }) => path);
  constructor(
    public docs: DocsService,
    public media: MediaMatcher,
    public changeDetectorRef: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver
  ) {
    console.log(this.links);
  }
  ngOnInit(): void {}
  ngOnDestroy(): void {
  }
}
