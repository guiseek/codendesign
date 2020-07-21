import { DocsService } from './shared/docs.service';
import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'cnd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'Code \'N Design';

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(
    public docs: DocsService,
    private media: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
