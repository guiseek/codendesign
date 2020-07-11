import { OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

export abstract class SubjectDestroyerBase implements OnDestroy {
  destroy$: Subject<void> = new Subject<void>();

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
