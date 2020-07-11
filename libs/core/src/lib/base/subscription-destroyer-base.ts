import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export abstract class SubscriptionDestroyerBase implements OnDestroy {
  private _$subs: Subscription[] = [];

  public get $subs(): Subscription[] {
    return this._$subs;
  }
  public set $subs([value]: Subscription[]) {
    this._$subs = [...this._$subs, value];
  }

  public set subs(value: Subscription) {
    this.$subs = [...this._$subs, value];
  }

  ngOnDestroy() {
    this.$subs.forEach((sub) => sub.unsubscribe());
  }
}
