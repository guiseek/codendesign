import { Observable } from 'rxjs';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
import { DocsService } from './../shared/docs.service';
import {
  Component,
  ViewEncapsulation,
  ChangeDetectorRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

declare var ng: any;

@Component({
  selector: 'cnd-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated,
})
export class DocsComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  doc$: Observable<ScullyRoute>;
  constructor(
    public docs: DocsService,
    private media: MediaMatcher,
    private scully: ScullyRoutesService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit() {
    this.doc$ = this.scully.getCurrent();
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
