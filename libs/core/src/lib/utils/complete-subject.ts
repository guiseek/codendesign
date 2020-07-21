import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';

export class CompleteSubject implements OnDestroy {
  destroy$: Subject<void> = new Subject<void>();

  ngOnDestroy() {
    this.destroy$.complete();
  }
}
