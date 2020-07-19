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
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  links = children.map(({ path }) => path);
  constructor(
    media: MediaMatcher,
    private breakpointObserver: BreakpointObserver,
    changeDetectorRef: ChangeDetectorRef
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    // this.mobileQuery.addEventListener('change', this._mobileQueryListener);
    console.log(this.links);
  }
  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    // this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
