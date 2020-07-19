import { DocsService } from './../shared/docs.service';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewEncapsulation, ViewContainerRef, ComponentFactoryResolver, ChangeDetectorRef, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router, ROUTES} from '@angular/router';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
import { map } from 'rxjs/operators';
import { MediaMatcher } from '@angular/cdk/layout';

declare var ng: any;

@Component({
  selector: 'cnd-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated

})
export class DocsComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    public docs: DocsService,
    public media: MediaMatcher,
    public changeDetectorRef: ChangeDetectorRef
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
