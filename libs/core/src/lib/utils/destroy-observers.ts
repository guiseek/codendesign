import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

export abstract class DestroyObservers implements OnDestroy {
  private _$subs: Subscription[] = [];

  public get $subs(): Subscription[] {
    return this._$subs;
  }
  public set $subs([sub]: Subscription[]) {
    this._$subs = [...this._$subs, sub];
  }
  public set subs(sub: Subscription) {
    this.$subs = [...this._$subs, sub];
  }
  ngOnDestroy(): void {
    return (
      !!this._$subs.length &&
      this._$subs.forEach((s) => {
        s.unsubscribe();
      })
    );
  }
}
