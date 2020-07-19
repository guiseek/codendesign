import { HighlightService } from './../shared/highlight.service';
import { DocsService } from './../shared/docs.service';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewEncapsulation, ViewContainerRef, ComponentFactoryResolver, ChangeDetectorRef, OnDestroy, AfterViewChecked } from '@angular/core';
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
export class DocsComponent implements AfterViewChecked, OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    public docs: DocsService,
    private media: MediaMatcher,
    private highlight: HighlightService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngAfterViewChecked() {
    this.highlight.highlightAll();
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
